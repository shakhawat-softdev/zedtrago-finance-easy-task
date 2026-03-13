import { Injectable, NotFoundException } from "@nestjs/common";
import { PayableEntity } from "src/database/entities/payable.entity";
import { payables } from "src/database/seed/sample-data";
import { CreatePayableDto } from "./dto/create-payable.dto";

@Injectable()
export class PayablesService {
  findAll(): PayableEntity[] {
    return payables;
  }

  findOne(id: string): PayableEntity {
    const payable = payables.find((record) => record.id === id);
    if (!payable) {
      throw new NotFoundException(`Payable ${id} not found`);
    }
    return payable;
  }

  create(payload: CreatePayableDto): PayableEntity {
    const payable: PayableEntity = {
      id: `payb-${1000 + payables.length + 1}`,
      ...payload,
    };
    payables.push(payable);
    return payable;
  }

  update(id: string, payload: Partial<CreatePayableDto>): PayableEntity {
    const index = payables.findIndex((record) => record.id === id);
    if (index === -1) {
      throw new NotFoundException(`Payable ${id} not found`);
    }

    payables[index] = { ...payables[index], ...payload };
    return payables[index];
  }

  remove(id: string): { deleted: boolean } {
    const index = payables.findIndex((record) => record.id === id);
    if (index === -1) {
      throw new NotFoundException(`Payable ${id} not found`);
    }

    payables.splice(index, 1);
    return { deleted: true };
  }
}
