import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";

export class SyncJobDto {
  @ApiProperty({ example: "hotel-supplier" })
  @IsString()
  source: string;

  @ApiProperty({ example: "pull" })
  @IsIn(["pull", "push", "webhook"])
  mode: "pull" | "push" | "webhook";

  @ApiProperty({ example: "bookings" })
  @IsString()
  resource: string;
}
