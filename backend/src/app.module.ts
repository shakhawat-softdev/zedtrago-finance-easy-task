import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { CustomersModule } from "./modules/customers/customers.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { InvoicesModule } from "./modules/invoices/invoices.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { PayablesModule } from "./modules/payables/payables.module";
import { CommissionsModule } from "./modules/commissions/commissions.module";
import { SuppliersModule } from "./modules/suppliers/suppliers.module";
import { LedgerModule } from "./modules/ledger/ledger.module";
import { ReportingModule } from "./modules/reporting/reporting.module";
import { CurrencyModule } from "./modules/currency/currency.module";
import { IntegrationsModule } from "./modules/integrations/integrations.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    AuthModule,
    UsersModule,
    CustomersModule,
    BookingsModule,
    InvoicesModule,
    PaymentsModule,
    PayablesModule,
    CommissionsModule,
    SuppliersModule,
    LedgerModule,
    ReportingModule,
    CurrencyModule,
    IntegrationsModule,
  ],
})
export class AppModule {}
