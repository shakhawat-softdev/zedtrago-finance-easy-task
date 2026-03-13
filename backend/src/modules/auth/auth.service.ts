import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac, timingSafeEqual } from "node:crypto";
import { users } from "src/database/seed/sample-data";
import { LoginDto } from "./dto/login.dto";

type AuthTokenPayload = {
  sub: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async login(payload: LoginDto) {
    const user = users.find((entry) => entry.email === payload.email);

    if (!user || payload.password !== "Passw0rd!") {
      throw new UnauthorizedException("Invalid credentials");
    }

    const tokenPayload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const accessToken = this.signToken(tokenPayload);

    return {
      accessToken,
      expiresIn: this.configService.get<string>("JWT_EXPIRES_IN", "1h"),
      user,
    };
  }

  async validateToken(authorization?: string) {
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing bearer token");
    }

    const accessToken = authorization.replace("Bearer ", "");
    try {
      return this.verifyToken(accessToken) as {
        sub: string;
        role: string;
        email: string;
      };
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }

  private signToken(payload: Omit<AuthTokenPayload, "iat" | "exp">): string {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const expiresInSeconds = this.parseExpiresIn(
      this.configService.get<string>("JWT_EXPIRES_IN", "1h"),
    );

    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const fullPayload: AuthTokenPayload = {
      ...payload,
      iat: nowInSeconds,
      exp: nowInSeconds + expiresInSeconds,
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(fullPayload));
    const signature = this.sign(`${encodedHeader}.${encodedPayload}`);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  private verifyToken(token: string): AuthTokenPayload {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");

    if (!encodedHeader || !encodedPayload || !encodedSignature) {
      throw new UnauthorizedException("Invalid token");
    }

    const expectedSignature = this.sign(`${encodedHeader}.${encodedPayload}`);
    const providedSignature = Buffer.from(encodedSignature);
    const actualSignature = Buffer.from(expectedSignature);

    if (
      providedSignature.length !== actualSignature.length ||
      !timingSafeEqual(providedSignature, actualSignature)
    ) {
      throw new UnauthorizedException("Invalid token signature");
    }

    const payload = JSON.parse(
      this.base64UrlDecode(encodedPayload),
    ) as AuthTokenPayload;

    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException("Token expired");
    }

    return payload;
  }

  private sign(value: string): string {
    return createHmac(
      "sha256",
      this.configService.get<string>("JWT_SECRET", "demo-secret"),
    )
      .update(value)
      .digest("base64url");
  }

  private base64UrlEncode(value: string): string {
    return Buffer.from(value, "utf8").toString("base64url");
  }

  private base64UrlDecode(value: string): string {
    return Buffer.from(value, "base64url").toString("utf8");
  }

  private parseExpiresIn(value: string): number {
    const match = value.match(/^(\d+)([smhd])$/);

    if (!match) {
      return 3600;
    }

    const amount = Number(match[1]);
    const unit = match[2];
    const multipliers: Record<string, number> = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    };

    return amount * multipliers[unit];
  }
}
