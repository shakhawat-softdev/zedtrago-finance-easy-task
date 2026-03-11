import { Injectable, NotFoundException } from "@nestjs/common";
import { PaymentEntity } from "src/database/entities/payment.entity";
import { payments } from "src/database/seed/sample-data";
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
}
