import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { UserEntity } from "src/database/entities/user.entity";
import { UsersService } from "./users.service";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "List all platform users and their roles" })
  @ApiOkResponse({ type: [UserEntity] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single user by ID" })
  @ApiParam({ name: "id", example: "usr-001" })
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user role or profile information" })
  @ApiParam({ name: "id", example: "usr-001" })
  @ApiBody({
    schema: { example: { name: "Updated Name", role: "accountant" } },
  })
  @ApiOkResponse({ type: UserEntity })
  update(@Param("id") id: string, @Body() payload: Partial<UserEntity>) {
    return this.usersService.update(id, payload);
  }
}
