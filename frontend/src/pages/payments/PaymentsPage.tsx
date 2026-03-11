import { FormEvent, useState } from "react";
import { Table } from "../../components/table/Table";
import {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
} from "../../services/api";
import { formatDate } from "../../utils/format";
import { toastError, toastSuccess } from "../../utils/notify";

export function PaymentsPage() {
  const { data = [], isLoading, refetch } = useGetPaymentsQuery();
  const [createPayment, { isLoading: creating }] = useCreatePaymentMutation();
  const [form, setForm] = useState({
    invoiceId: "inv-1001",
    provider: "stripe",
    status: "captured",
    currency: "AUD",
    amount: 2480,
    receivedAt: "2026-03-10T11:00:00.000Z",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createPayment({ ...form, amount: Number(form.amount) }).unwrap();
      toastSuccess("Payment created successfully");
      refetch();
    } catch {
      toastError("Failed to create payment");
    }
  }

  return (
    <div className="section-stack">
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Payments</h2>
        <input
          placeholder="Invoice ID"
          value={form.invoiceId}
          onChange={(e) => setForm({ ...form, invoiceId: e.target.value })}
          required
        />
        <input
          placeholder="Provider"
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          required
        />
        <input
          placeholder="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        />
        <input
          placeholder="Currency"
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
          required
        />
        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
          required
        />
        <input
          placeholder="Received At ISO"
          value={form.receivedAt}
          onChange={(e) => setForm({ ...form, receivedAt: e.target.value })}
          required
        />
        <button className="btn" type="submit" disabled={creating}>
          {creating ? "Saving..." : "Add Payment"}
        </button>
      </form>

      {isLoading ? (
        <div className="card">Loading payments...</div>
      ) : (
        <Table
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "invoiceId", header: "Invoice" },
            { key: "provider", header: "Provider" },
            { key: "status", header: "Status" },
            { key: "currency", header: "Currency" },
            { key: "amount", header: "Amount" },
            {
              key: "receivedAt",
              header: "Received",
              render: (row) => formatDate(row.receivedAt),
            },
          ]}
        />
      )}
    </div>
  );
}
