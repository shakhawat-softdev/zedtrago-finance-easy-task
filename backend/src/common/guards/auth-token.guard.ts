import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    request.user = await this.authService.validateToken(
      request.headers.authorization,
    );
    return true;
  }
}
