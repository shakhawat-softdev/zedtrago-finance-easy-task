import { Injectable, NotFoundException } from "@nestjs/common";
import { LedgerTransactionEntity } from "src/database/entities/ledger-transaction.entity";
import { accounts, ledgerTransactions } from "src/database/seed/sample-data";
import { CreateLedgerTransactionDto } from "./dto/create-ledger-transaction.dto";

@Injectable()
export class LedgerService {
  findAll() {
    return ledgerTransactions;
  }

  findOne(id: string): LedgerTransactionEntity {
    const tx = ledgerTransactions.find((t) => t.id === id);
    if (!tx) throw new NotFoundException(`Ledger transaction ${id} not found`);
    return tx;
  }

  create(payload: CreateLedgerTransactionDto): LedgerTransactionEntity {
    const ledgerTransaction: LedgerTransactionEntity = {
      id: `led-${1000 + ledgerTransactions.length + 1}`,
      postedAt: new Date().toISOString(),
      ...payload,
    };
    ledgerTransactions.push(ledgerTransaction);
    return ledgerTransaction;
  }

  getTrialBalance() {
    const balanceMap: Record<
      string,
      { code: string; name: string; debit: number; credit: number }
    > = {};

    for (const account of accounts) {
      balanceMap[account.code] = {
        code: account.code,
        name: account.name,
        debit: 0,
        credit: 0,
      };
    }

    for (const tx of ledgerTransactions) {
      for (const line of tx.entries) {
        if (!balanceMap[line.accountCode]) {
          balanceMap[line.accountCode] = {
            code: line.accountCode,
            name: line.description,
            debit: 0,
            credit: 0,
          };
        }
        balanceMap[line.accountCode].debit += line.debit || 0;
        balanceMap[line.accountCode].credit += line.credit || 0;
      }
    }

    const accountList = Object.values(balanceMap).map((a) => ({
      ...a,
      balance: a.debit - a.credit,
    }));

    const totalDebit = accountList.reduce((sum, a) => sum + a.debit, 0);
    const totalCredit = accountList.reduce((sum, a) => sum + a.credit, 0);

    return {
      accounts: accountList,
      totalDebit,
      totalCredit,
      balanced: Math.abs(totalDebit - totalCredit) < 0.01,
    };
  }
}
