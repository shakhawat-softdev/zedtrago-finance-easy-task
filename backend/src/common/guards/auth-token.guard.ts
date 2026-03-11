import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = this.validateToken(request.headers.authorization);
    return true;
  }

  private validateToken(authorization?: string) {
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing bearer token");
    }

    const encodedToken = authorization.replace("Bearer ", "");
    try {
      return JSON.parse(
        Buffer.from(encodedToken, "base64").toString("utf8"),
      ) as {
        sub: string;
        role: string;
        email: string;
      };
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
