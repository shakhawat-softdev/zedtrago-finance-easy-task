import { FormEvent, useState } from "react";
import { CommonDataTable } from "../../utils/CommonDataTable";
import {
  useCreateLedgerTransactionMutation,
  useGetLedgerTransactionsQuery,
  useGetTrialBalanceQuery,
} from "../../services/api";
import { formatDate, formatMoney } from "../../utils/format";
import { toastError, toastSuccess } from "../../utils/notify";

export function LedgerPage() {
  const {
    data: transactions = [],
    isLoading: loadingTransactions,
    refetch,
  } = useGetLedgerTransactionsQuery();
  const { data: trialBalance, isLoading: loadingBalance } =
    useGetTrialBalanceQuery();
  const [createLedgerTransaction, { isLoading: creating }] =
    useCreateLedgerTransactionMutation();
  const [form, setForm] = useState({
    sourceEvent: "manual_adjustment",
    referenceId: "adj-1001",
    currency: "USD",
    debitAccountCode: "1100",
    debitAmount: 100,
    debitDescription: "Manual receivable adjustment",
    creditAccountCode: "4100",
    creditAmount: 100,
    creditDescription: "Offsetting revenue adjustment",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createLedgerTransaction({
        sourceEvent: form.sourceEvent,
        referenceId: form.referenceId,
        currency: form.currency,
        entries: [
          {
            accountCode: form.debitAccountCode,
            debit: Number(form.debitAmount),
            credit: 0,
            description: form.debitDescription,
          },
          {
            accountCode: form.creditAccountCode,
            debit: 0,
            credit: Number(form.creditAmount),
            description: form.creditDescription,
          },
        ],
      }).unwrap();
      toastSuccess("Ledger transaction posted successfully");
      refetch();
    } catch {
      toastError("Failed to post ledger transaction");
    }
  }

  return (
    <div className="section-stack">
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Post Ledger Transaction</h2>
        <input
          placeholder="Source Event"
          value={form.sourceEvent}
          onChange={(event) =>
            setForm({ ...form, sourceEvent: event.target.value })
          }
          required
        />
        <input
          placeholder="Reference ID"
          value={form.referenceId}
          onChange={(event) =>
            setForm({ ...form, referenceId: event.target.value })
          }
          required
        />
        <input
          placeholder="Currency"
          value={form.currency}
          onChange={(event) =>
            setForm({ ...form, currency: event.target.value })
          }
          required
        />
        <input
          placeholder="Debit Account"
          value={form.debitAccountCode}
          onChange={(event) =>
            setForm({ ...form, debitAccountCode: event.target.value })
          }
          required
        />
        <input
          placeholder="Debit Amount"
          type="number"
          value={form.debitAmount}
          onChange={(event) =>
            setForm({ ...form, debitAmount: Number(event.target.value) })
          }
          required
        />
        <input
          placeholder="Debit Description"
          value={form.debitDescription}
          onChange={(event) =>
            setForm({ ...form, debitDescription: event.target.value })
          }
          required
        />
        <input
          placeholder="Credit Account"
          value={form.creditAccountCode}
          onChange={(event) =>
            setForm({ ...form, creditAccountCode: event.target.value })
          }
          required
        />
        <input
          placeholder="Credit Amount"
          type="number"
          value={form.creditAmount}
          onChange={(event) =>
            setForm({ ...form, creditAmount: Number(event.target.value) })
          }
          required
        />
        <input
          placeholder="Credit Description"
          value={form.creditDescription}
          onChange={(event) =>
            setForm({ ...form, creditDescription: event.target.value })
          }
          required
        />
        <button className="btn" type="submit" disabled={creating}>
          {creating ? "Posting..." : "Post Transaction"}
        </button>
      </form>

      <section className="page-grid">
        <article className="card kpi tone-blue">
          <span className="kpi-label">Trial Balance</span>
          <h3>{trialBalance?.balanced ? "Balanced" : "Review"}</h3>
          <p>Ledger debits and credits are checked in real time.</p>
        </article>
        <article className="card kpi tone-emerald">
          <span className="kpi-label">Total Debit</span>
          <h3>{formatMoney(trialBalance?.totalDebit ?? 0)}</h3>
          <p>Current aggregate debit movement.</p>
        </article>
        <article className="card kpi tone-rose">
          <span className="kpi-label">Total Credit</span>
          <h3>{formatMoney(trialBalance?.totalCredit ?? 0)}</h3>
          <p>Current aggregate credit movement.</p>
        </article>
        <article className="card kpi tone-slate">
          <span className="kpi-label">Transactions</span>
          <h3>{transactions.length}</h3>
          <p>Posted journal transactions in the current ledger view.</p>
        </article>
      </section>

      {loadingBalance ? (
        <div className="card">Loading trial balance...</div>
      ) : (
        <CommonDataTable
          data={trialBalance?.accounts ?? []}
          columns={[
            { key: "code", header: "Account" },
            { key: "name", header: "Name" },
            { key: "debit", header: "Debit" },
            { key: "credit", header: "Credit" },
            { key: "balance", header: "Balance" },
          ]}
          emptyText="No ledger balances available"
        />
      )}

      {loadingTransactions ? (
        <div className="card">Loading ledger transactions...</div>
      ) : (
        <CommonDataTable
          data={transactions}
          columns={[
            { key: "id", header: "ID" },
            { key: "sourceEvent", header: "Source Event" },
            { key: "referenceId", header: "Reference" },
            { key: "currency", header: "Currency" },
            {
              key: "entries",
              header: "Entries",
              render: (row) => row.entries.length,
            },
            {
              key: "postedAt",
              header: "Posted At",
              render: (row) => formatDate(row.postedAt),
            },
          ]}
        />
      )}
    </div>
  );
}

