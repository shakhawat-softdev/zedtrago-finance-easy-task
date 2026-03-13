import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PaymentEntity } from "src/database/entities/payment.entity";
import { payments } from "src/database/seed/sample-data";
import { CreateGatewayPaymentDto } from "./dto/create-gateway-payment.dto";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService {
  findAll() {
    return payments;
  }

  findOne(id: string): PaymentEntity {
    const payment = payments.find((p) => p.id === id);
    if (!payment) throw new NotFoundException(`Payment ${id} not found`);
    return payment;
  }

  create(payload: CreatePaymentDto): PaymentEntity {
    const payment: PaymentEntity = {
      id: `pay-${1000 + payments.length + 1}`,
      ...payload,
    };
    payments.push(payment);
    return payment;
  }

  update(id: string, payload: Partial<CreatePaymentDto>): PaymentEntity {
    const index = payments.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Payment ${id} not found`);
    payments[index] = { ...payments[index], ...payload };
    return payments[index];
  }

  remove(id: string): { deleted: boolean } {
    const index = payments.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Payment ${id} not found`);
    payments.splice(index, 1);
    return { deleted: true };
  }

  async createStripeCheckout(payload: CreateGatewayPaymentDto) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new BadRequestException("STRIPE_SECRET_KEY is not configured");
    }

    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:5173";
    const successUrl =
      payload.successUrl ||
      `${frontendBaseUrl}/payments?gateway=stripe&status=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl =
      payload.cancelUrl ||
      `${frontendBaseUrl}/payments?gateway=stripe&status=cancelled`;

    const amountInMinor = Math.round(payload.amount * 100);
    const currency = payload.currency.toLowerCase();

    const formData = new URLSearchParams();
    formData.append("mode", "payment");
    formData.append("success_url", successUrl);
    formData.append("cancel_url", cancelUrl);
    formData.append("client_reference_id", payload.invoiceId);
    formData.append("line_items[0][quantity]", "1");
    formData.append("line_items[0][price_data][currency]", currency);
    formData.append("line_items[0][price_data][unit_amount]", String(amountInMinor));
    formData.append(
      "line_items[0][price_data][product_data][name]",
      `Invoice ${payload.invoiceId}`,
    );

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new BadGatewayException(
        `Stripe checkout creation failed: ${JSON.stringify(data)}`,
      );
    }

    const sessionId = String(data.id || "");
    const checkoutUrl = String(data.url || "");
    if (!sessionId || !checkoutUrl) {
      throw new BadGatewayException("Stripe response missing checkout session URL");
    }

    this.upsertGatewayPayment({
      invoiceId: payload.invoiceId,
      provider: "stripe",
      status: "pending",
      currency: payload.currency,
      amount: payload.amount,
      gatewayReference: sessionId,
      gatewayCheckoutUrl: checkoutUrl,
    });

    return {
      provider: "stripe",
      sessionId,
      checkoutUrl,
    };
  }

  async createPayPalOrder(payload: CreateGatewayPaymentDto) {
    const paypalBaseUrl = this.getPayPalBaseUrl();
    const accessToken = await this.getPayPalAccessToken(paypalBaseUrl);

    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:5173";
    const returnUrl =
      payload.returnUrl ||
      `${frontendBaseUrl}/payments?gateway=paypal&status=success`;
    const cancelUrl =
      payload.cancelUrl ||
      `${frontendBaseUrl}/payments?gateway=paypal&status=cancelled`;

    const response = await fetch(`${paypalBaseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            custom_id: payload.invoiceId,
            invoice_id: payload.invoiceId,
            amount: {
              currency_code: this.normalizeCurrency(payload.currency),
              value: payload.amount.toFixed(2),
            },
          },
        ],
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
          user_action: "PAY_NOW",
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new BadGatewayException(
        `PayPal order creation failed: ${JSON.stringify(data)}`,
      );
    }

    const orderId = String(data.id || "");
    const approvalUrl = String(
      data.links?.find((link: { rel?: string }) => link.rel === "approve")?.href ||
        "",
    );

    if (!orderId || !approvalUrl) {
      throw new BadGatewayException("PayPal response missing order approval URL");
    }

    this.upsertGatewayPayment({
      invoiceId: payload.invoiceId,
      provider: "paypal",
      status: "pending",
      currency: payload.currency,
      amount: payload.amount,
      gatewayReference: orderId,
      gatewayCheckoutUrl: approvalUrl,
    });

    return {
      provider: "paypal",
      orderId,
      approvalUrl,
      status: String(data.status || "CREATED"),
    };
  }

  async capturePayPalOrder(orderId: string) {
    const paypalBaseUrl = this.getPayPalBaseUrl();
    const accessToken = await this.getPayPalAccessToken(paypalBaseUrl);

    const response = await fetch(
      `${paypalBaseUrl}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new BadGatewayException(
        `PayPal capture failed: ${JSON.stringify(data)}`,
      );
    }

    const purchaseUnit = data.purchase_units?.[0];
    const invoiceId = String(
      purchaseUnit?.payments?.captures?.[0]?.custom_id ||
        purchaseUnit?.custom_id ||
        purchaseUnit?.invoice_id ||
        "",
    );
    const amount = Number(
      purchaseUnit?.payments?.captures?.[0]?.amount?.value ||
        purchaseUnit?.amount?.value ||
        0,
    );
    const currency =
      purchaseUnit?.payments?.captures?.[0]?.amount?.currency_code ||
      purchaseUnit?.amount?.currency_code ||
      "USD";

    let paymentId: string | undefined;
    if (invoiceId) {
      const payment = this.upsertGatewayPayment({
        invoiceId,
        provider: "paypal",
        status: data.status === "COMPLETED" ? "captured" : "pending",
        currency,
        amount,
        gatewayReference: orderId,
      });
      paymentId = payment.id;
    }

    return {
      provider: "paypal",
      orderId,
      status: String(data.status || "UNKNOWN"),
      paymentId,
    };
  }

  handleStripeWebhook(event: Record<string, unknown>, signature?: string) {
    const eventType = String(event.type || "unknown");
    const object = (event.data as { object?: Record<string, unknown> })?.object;

    let paymentId: string | undefined;
    if (object) {
      const invoiceId = String(
        object.client_reference_id ||
          (object.metadata as Record<string, unknown> | undefined)?.invoiceId ||
          "",
      );
      const amount = Number(object.amount_total || object.amount || 0) / 100;
      const currency = String(object.currency || "USD").toUpperCase();
      const reference = String(object.id || "");

      if (invoiceId) {
        const payment = this.upsertGatewayPayment({
          invoiceId,
          provider: "stripe",
          status:
            eventType === "checkout.session.completed" ||
            eventType === "payment_intent.succeeded"
              ? "captured"
              : "pending",
          currency,
          amount,
          gatewayReference: reference,
          lastWebhookEvent: eventType,
        });
        paymentId = payment.id;
      }
    }

    return {
      received: true,
      provider: "stripe",
      eventType,
      signaturePresent: Boolean(signature),
      paymentId,
    };
  }

  handlePayPalWebhook(event: Record<string, unknown>) {
    const eventType = String(event.event_type || "unknown");
    const resource = (event.resource as Record<string, unknown>) || {};

    const invoiceId = String(resource.custom_id || resource.invoice_id || "");
    const amount = Number(
      (resource.amount as Record<string, unknown> | undefined)?.value || 0,
    );
    const currency = String(
      (resource.amount as Record<string, unknown> | undefined)?.currency_code ||
        "USD",
    );

    let paymentId: string | undefined;
    if (invoiceId) {
      const payment = this.upsertGatewayPayment({
        invoiceId,
        provider: "paypal",
        status:
          eventType === "PAYMENT.CAPTURE.COMPLETED" ||
          eventType === "CHECKOUT.ORDER.APPROVED"
            ? "captured"
            : "pending",
        currency,
        amount,
        gatewayReference: String(resource.id || ""),
        lastWebhookEvent: eventType,
      });
      paymentId = payment.id;
    }

    return {
      received: true,
      provider: "paypal",
      eventType,
      paymentId,
    };
  }

  private upsertGatewayPayment(payload: {
    invoiceId: string;
    provider: string;
    status: string;
    currency: string;
    amount: number;
    gatewayReference?: string;
    gatewayCheckoutUrl?: string;
    lastWebhookEvent?: string;
  }) {
    const existingIndex = payments.findIndex(
      (payment) =>
        (payload.gatewayReference &&
          payment.gatewayReference === payload.gatewayReference) ||
        (payment.invoiceId === payload.invoiceId &&
          payment.provider === payload.provider &&
          payment.status === "pending"),
    );

    if (existingIndex !== -1) {
      payments[existingIndex] = {
        ...payments[existingIndex],
        ...payload,
        currency: this.normalizeCurrency(payload.currency),
        receivedAt:
          payload.status === "captured"
            ? new Date().toISOString()
            : payments[existingIndex].receivedAt,
      };
      return payments[existingIndex];
    }

    const payment: PaymentEntity = {
      id: `pay-${1000 + payments.length + 1}`,
      invoiceId: payload.invoiceId,
      provider: payload.provider,
      status: payload.status,
      currency: this.normalizeCurrency(payload.currency),
      amount: payload.amount,
      receivedAt: new Date().toISOString(),
      gatewayReference: payload.gatewayReference,
      gatewayCheckoutUrl: payload.gatewayCheckoutUrl,
      lastWebhookEvent: payload.lastWebhookEvent,
    };
    payments.push(payment);
    return payment;
  }

  private getPayPalBaseUrl() {
    const mode = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
    return mode === "live"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";
  }

  private async getPayPalAccessToken(paypalBaseUrl: string) {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      throw new BadRequestException(
        "PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET is not configured",
      );
    }

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    const response = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    if (!response.ok || !data.access_token) {
      throw new BadGatewayException(
        `PayPal token fetch failed: ${JSON.stringify(data)}`,
      );
    }

    return String(data.access_token);
  }

  private normalizeCurrency(currency: string) {
    return currency.toUpperCase();
  }
}
