import { ApiProperty } from "@nestjs/swagger";

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ example: "finance_manager" })
  role: string;

  @ApiProperty({ example: "active" })
  status: string;

  @ApiProperty({ example: "MY" })
  region: string;
}
