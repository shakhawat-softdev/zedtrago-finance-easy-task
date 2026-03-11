import { Injectable, NotFoundException } from "@nestjs/common";
import { CurrencyRateEntity } from "src/database/entities/currency-rate.entity";
import { currencyRates } from "src/database/seed/sample-data";
import { CreateRateDto } from "./dto/create-rate.dto";

@Injectable()
export class CurrencyService {
  findAll() {
    return currencyRates;
  }

  findOne(key: string): CurrencyRateEntity {
    // key format: "AUD-MYR" or "AUD-MYR-2026-03-10"
    const [from, to] = key.split("-");
    const rate = currencyRates.find(
      (r) => r.fromCurrency === from && r.toCurrency === to,
    );
    if (!rate) throw new NotFoundException(`Currency rate ${key} not found`);
    return rate;
  }

  create(payload: CreateRateDto): CurrencyRateEntity {
    currencyRates.push(payload);
    return payload;
  }

  update(key: string, payload: Partial<CreateRateDto>): CurrencyRateEntity {
    const [from, to] = key.split("-");
    const index = currencyRates.findIndex(
      (r) => r.fromCurrency === from && r.toCurrency === to,
    );
    if (index === -1)
      throw new NotFoundException(`Currency rate ${key} not found`);
    currencyRates[index] = { ...currencyRates[index], ...payload };
    return currencyRates[index];
  }

  remove(key: string): { deleted: boolean } {
    const [from, to] = key.split("-");
    const index = currencyRates.findIndex(
      (r) => r.fromCurrency === from && r.toCurrency === to,
    );
    if (index === -1)
      throw new NotFoundException(`Currency rate ${key} not found`);
    currencyRates.splice(index, 1);
    return { deleted: true };
  }
}
