import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PayablesController } from "./payables.controller";
import { PayablesService } from "./payables.service";

@Module({
  imports: [AuthModule],
  controllers: [PayablesController],
  providers: [PayablesService],
  exports: [PayablesService],
})
export class PayablesModule {}
