import { Global, Module } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module";
import { AuthTokenGuard } from "./guards/auth-token.guard";
import { RolesGuard } from "./guards/roles.guard";

@Global()
@Module({
  imports: [AuthModule],
  providers: [AuthTokenGuard, RolesGuard],
  exports: [AuthTokenGuard, RolesGuard],
})
export class CommonModule {}
