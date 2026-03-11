import { Injectable, NotFoundException } from "@nestjs/common";
import { SupplierEntity } from "src/database/entities/supplier.entity";
import { suppliers } from "src/database/seed/sample-data";
import { CreateSupplierDto } from "./dto/create-supplier.dto";

@Injectable()
export class SuppliersService {
  findAll() {
    return suppliers;
  }

  findOne(id: string): SupplierEntity {
    const supplier = suppliers.find((s) => s.id === id);
    if (!supplier) throw new NotFoundException(`Supplier ${id} not found`);
    return supplier;
  }

  create(payload: CreateSupplierDto): SupplierEntity {
    const supplier: SupplierEntity = {
      id: `sup-${String(suppliers.length + 1).padStart(3, "0")}`,
      ...payload,
    };
    suppliers.push(supplier);
    return supplier;
  }

  update(id: string, payload: Partial<CreateSupplierDto>): SupplierEntity {
    const index = suppliers.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException(`Supplier ${id} not found`);
    suppliers[index] = { ...suppliers[index], ...payload };
    return suppliers[index];
  }

  remove(id: string): { deleted: boolean } {
    const index = suppliers.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException(`Supplier ${id} not found`);
    suppliers.splice(index, 1);
    return { deleted: true };
  }
}
