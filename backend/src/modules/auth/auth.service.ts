import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { users } from "src/database/seed/sample-data";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  login(payload: LoginDto) {
    const user = users.find((entry) => entry.email === payload.email);

    if (!user || payload.password !== "Passw0rd!") {
      throw new UnauthorizedException("Invalid credentials");
    }

    const accessToken = Buffer.from(
      JSON.stringify({
        sub: user.id,
        role: user.role,
        email: user.email,
        secret: this.configService.get<string>("JWT_SECRET", "demo-secret"),
      }),
    ).toString("base64");

    return {
      accessToken,
      expiresIn: this.configService.get<string>("JWT_EXPIRES_IN", "1h"),
      user,
    };
  }

  validateToken(authorization?: string) {
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
