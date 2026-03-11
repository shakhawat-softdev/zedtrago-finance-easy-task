import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { BookingEntity } from "src/database/entities/booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { BookingsService } from "./bookings.service";

@ApiTags("Bookings")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({
    summary: "List all travel bookings with financial attributes",
  })
  @ApiOkResponse({ type: [BookingEntity] })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single booking by ID" })
  @ApiParam({ name: "id", example: "bok-1001" })
  @ApiOkResponse({ type: BookingEntity })
  findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: "Create a booking and trigger downstream accounting workflows",
  })
  @ApiBody({ type: CreateBookingDto })
  @ApiOkResponse({ type: BookingEntity })
  create(@Body() payload: CreateBookingDto) {
    return this.bookingsService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update booking status or financial attributes" })
  @ApiParam({ name: "id", example: "bok-1001" })
  @ApiBody({ type: CreateBookingDto })
  @ApiOkResponse({ type: BookingEntity })
  update(@Param("id") id: string, @Body() payload: Partial<CreateBookingDto>) {
    return this.bookingsService.update(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Cancel and remove a booking record" })
  @ApiParam({ name: "id", example: "bok-1001" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("id") id: string) {
    return this.bookingsService.remove(id);
  }
}
