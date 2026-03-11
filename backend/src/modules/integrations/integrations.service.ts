import { Injectable } from "@nestjs/common";
import { SyncJobDto } from "./dto/sync-job.dto";

@Injectable()
export class IntegrationsService {
  listConnectors() {
    return [
      {
        name: "Stripe",
        auth: "API keys + signed webhooks",
        retryPolicy: "Exponential backoff with dead-letter review",
      },
      {
        name: "PayPal",
        auth: "OAuth2 client credentials",
        retryPolicy: "Idempotency keys on capture and refund calls",
      },
      {
        name: "Hotel Supplier APIs",
        auth: "Mutual API keys and IP allow lists",
        retryPolicy: "Circuit breaker + reconciliation queue",
      },
      {
        name: "GDS Systems",
        auth: "Session-based tokens and message signatures",
        retryPolicy: "Replay-safe event consumer with offset tracking",
      },
      {
        name: "CRM Platforms",
        auth: "OAuth2 + scoped refresh tokens",
        retryPolicy: "Webhook deduplication and retry with poison queue",
      },
    ];
  }

  runSync(payload: SyncJobDto) {
    return {
      status: "queued",
      correlationId: `sync-${Date.now()}`,
      ...payload,
      strategy:
        "API-first orchestration with event-driven projections and idempotent handlers",
    };
  }
}
