import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerEntity } from "src/database/entities/customer.entity";
import { customers } from "src/database/seed/sample-data";
import { CreateCustomerDto } from "./dto/create-customer.dto";

@Injectable()
export class CustomersService {
  findAll() {
    return customers;
  }

  findOne(id: string): CustomerEntity {
    const customer = customers.find((c) => c.id === id);
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);
    return customer;
  }

  create(payload: CreateCustomerDto): CustomerEntity {
    const customer: CustomerEntity = {
      id: `cus-${String(customers.length + 1).padStart(3, "0")}`,
      ...payload,
    };
    customers.push(customer);
    return customer;
  }

  update(id: string, payload: Partial<CreateCustomerDto>): CustomerEntity {
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Customer ${id} not found`);
    customers[index] = { ...customers[index], ...payload };
    return customers[index];
  }

  remove(id: string): { deleted: boolean } {
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Customer ${id} not found`);
    customers.splice(index, 1);
    return { deleted: true };
  }
}
