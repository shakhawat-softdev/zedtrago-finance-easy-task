import { Injectable, NotFoundException } from "@nestjs/common";
import { BookingEntity } from "src/database/entities/booking.entity";
import { bookings } from "src/database/seed/sample-data";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable()
export class BookingsService {
  findAll() {
    return bookings;
  }

  findOne(id: string): BookingEntity {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) throw new NotFoundException(`Booking ${id} not found`);
    return booking;
  }

  create(payload: CreateBookingDto): BookingEntity {
    const booking: BookingEntity = {
      id: `bok-${1000 + bookings.length + 1}`,
      ...payload,
    };
    bookings.push(booking);
    return booking;
  }

  update(id: string, payload: Partial<CreateBookingDto>): BookingEntity {
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException(`Booking ${id} not found`);
    bookings[index] = { ...bookings[index], ...payload };
    return bookings[index];
  }

  remove(id: string): { deleted: boolean } {
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException(`Booking ${id} not found`);
    bookings.splice(index, 1);
    return { deleted: true };
  }
}
