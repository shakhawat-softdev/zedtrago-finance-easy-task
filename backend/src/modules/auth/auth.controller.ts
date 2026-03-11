import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Authenticate a user and return a bearer token" })
  @ApiBody({ type: LoginDto })
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Get("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Decode the current access token" })
  @ApiOkResponse({
    schema: {
      example: {
        sub: "usr-001",
        role: "finance_manager",
        email: "finance@zedtrago.com",
      },
    },
  })
  me(@Headers("authorization") authorization?: string) {
    return this.authService.validateToken(authorization);
  }
}
