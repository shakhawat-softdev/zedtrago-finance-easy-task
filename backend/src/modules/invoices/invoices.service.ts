import { Injectable, NotFoundException } from "@nestjs/common";
import { InvoiceEntity } from "src/database/entities/invoice.entity";
import { invoices } from "src/database/seed/sample-data";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";

@Injectable()
export class InvoicesService {
  findAll() {
    return invoices;
  }

  findOne(id: string): InvoiceEntity {
    const invoice = invoices.find((i) => i.id === id);
    if (!invoice) throw new NotFoundException(`Invoice ${id} not found`);
    return invoice;
  }

  create(payload: CreateInvoiceDto): InvoiceEntity {
    const invoice: InvoiceEntity = {
      id: `inv-${1000 + invoices.length + 1}`,
      invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(4, "0")}`,
      ...payload,
    };
    invoices.push(invoice);
    return invoice;
  }

  update(id: string, payload: Partial<CreateInvoiceDto>): InvoiceEntity {
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException(`Invoice ${id} not found`);
    invoices[index] = { ...invoices[index], ...payload };
    return invoices[index];
  }

  remove(id: string): { deleted: boolean } {
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException(`Invoice ${id} not found`);
    invoices.splice(index, 1);
    return { deleted: true };
  }
}
