import { Injectable, NotFoundException } from "@nestjs/common";
import { CommissionEntity } from "src/database/entities/commission.entity";
import { commissions } from "src/database/seed/sample-data";
import { CreateCommissionDto } from "./dto/create-commission.dto";

@Injectable()
export class CommissionsService {
  findAll() {
    return commissions;
  }

  findOne(id: string): CommissionEntity {
    const commission = commissions.find((c) => c.id === id);
    if (!commission) throw new NotFoundException(`Commission ${id} not found`);
    return commission;
  }

  create(payload: CreateCommissionDto): CommissionEntity {
    const commission: CommissionEntity = {
      id: `com-${1000 + commissions.length + 1}`,
      ...payload,
    };
    commissions.push(commission);
    return commission;
  }

  update(id: string, payload: Partial<CreateCommissionDto>): CommissionEntity {
    const index = commissions.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Commission ${id} not found`);
    commissions[index] = { ...commissions[index], ...payload };
    return commissions[index];
  }

  remove(id: string): { deleted: boolean } {
    const index = commissions.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Commission ${id} not found`);
    commissions.splice(index, 1);
    return { deleted: true };
  }
}
