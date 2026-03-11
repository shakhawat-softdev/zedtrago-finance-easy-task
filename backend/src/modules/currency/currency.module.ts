import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";

@Module({
  imports: [AuthModule],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
