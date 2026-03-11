import { FormEvent, useState } from "react";
import { Table } from "../../components/table/Table";
import {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
} from "../../services/api";
import { toastError, toastSuccess } from "../../utils/notify";

export function InvoicesPage() {
  const { data = [], isLoading, refetch } = useGetInvoicesQuery();
  const [createInvoice, { isLoading: creating }] = useCreateInvoiceMutation();
  const [form, setForm] = useState({
    bookingId: "bok-1001",
    status: "issued",
    currency: "AUD",
    totalAmount: 2480,
    dueDate: "2026-03-20",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createInvoice({
        ...form,
        totalAmount: Number(form.totalAmount),
      }).unwrap();
      toastSuccess("Invoice created successfully");
      refetch();
    } catch {
      toastError("Failed to create invoice");
    }
  }

  return (
    <div className="section-stack">
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Invoices</h2>
        <input
          placeholder="Booking ID"
          value={form.bookingId}
          onChange={(e) => setForm({ ...form, bookingId: e.target.value })}
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
          placeholder="Total Amount"
          type="number"
          value={form.totalAmount}
          onChange={(e) =>
            setForm({ ...form, totalAmount: Number(e.target.value) })
          }
          required
        />
        <input
          placeholder="Due Date YYYY-MM-DD"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          required
        />
        <button className="btn" type="submit" disabled={creating}>
          {creating ? "Saving..." : "Add Invoice"}
        </button>
      </form>

      {isLoading ? (
        <div className="card">Loading invoices...</div>
      ) : (
        <Table
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "invoiceNumber", header: "Number" },
            { key: "bookingId", header: "Booking" },
            { key: "status", header: "Status" },
            { key: "currency", header: "Currency" },
            { key: "totalAmount", header: "Total" },
            { key: "dueDate", header: "Due Date" },
          ]}
        />
      )}
    </div>
  );
}
