import { FormEvent, useState } from "react";
import { CommonDataTable } from "../../utils/CommonDataTable";
import {
  useCreatePaymentMutation,
  useDeletePaymentMutation,
  useGetInvoicesQuery,
  useGetPaymentsQuery,
  useUpdatePaymentMutation,
} from "../../services/api";
import { formatDate } from "../../utils/format";
import type { Payment } from "../../utils/types";
import {
  confirmDelete,
  toastError,
  toastSuccess,
  toastWarning,
} from "../../utils/notify";
import {
  COMMON_CURRENCIES,
  PAYMENT_PROVIDERS,
  PAYMENT_STATUSES,
} from "../../utils/formOptions";

export function PaymentsPage() {
  const { data = [], isLoading, refetch } = useGetPaymentsQuery();
  const { data: invoices = [] } = useGetInvoicesQuery();
  const [createPayment, { isLoading: creating }] = useCreatePaymentMutation();
  const [updatePayment, { isLoading: updating }] = useUpdatePaymentMutation();
  const [deletePayment] = useDeletePaymentMutation();
  const [form, setForm] = useState({
    invoiceId: "inv-1001",
    provider: "stripe",
    status: "captured",
    currency: "AUD",
    amount: 2480,
    receivedAt: "2026-03-10T11:00:00.000Z",
  });
  const [editTarget, setEditTarget] = useState<Payment | null>(null);
  const [editForm, setEditForm] = useState({
    invoiceId: "",
    provider: "",
    status: "",
    currency: "",
    amount: 0,
    receivedAt: "",
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

  function onStartEdit(payment: Payment) {
    setEditTarget(payment);
    setEditForm({
      invoiceId: payment.invoiceId,
      provider: payment.provider,
      status: payment.status,
      currency: payment.currency,
      amount: payment.amount,
      receivedAt: payment.receivedAt,
    });
  }

  function onCancelEdit() {
    setEditTarget(null);
    setEditForm({
      invoiceId: "",
      provider: "",
      status: "",
      currency: "",
      amount: 0,
      receivedAt: "",
    });
  }

  async function onSubmitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editTarget) return;

    try {
      await updatePayment({
        id: editTarget.id,
        payload: {
          ...editForm,
          amount: Number(editForm.amount),
        },
      }).unwrap();
      toastSuccess("Payment updated successfully");
      onCancelEdit();
      refetch();
    } catch {
      toastError("Failed to update payment");
    }
  }

  async function onDelete(id: string) {
    const shouldDelete = await confirmDelete("this payment");
    if (!shouldDelete) {
      toastWarning("Delete cancelled");
      return;
    }

    try {
      await deletePayment(id).unwrap();
      toastSuccess("Payment deleted successfully");
      refetch();
    } catch {
      toastError("Failed to delete payment");
    }
  }

  return (
    <div className="section-stack">
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Payments</h2>
        {!invoices.length && (
          <div
            className="card empty-state"
            style={{
              gridColumn: "1 / -1",
              padding: "1rem",
              backgroundColor: "#fef3c7",
              borderRadius: "0.5rem",
              color: "#92400e",
            }}
          >
            ⚠️ No invoices found. Please create an invoice in the Invoices page
            first.
          </div>
        )}
        <select
          value={form.invoiceId}
          onChange={(e) => setForm({ ...form, invoiceId: e.target.value })}
          required
          disabled={!invoices.length}
        >
          <option value="" disabled>
            Select invoice
          </option>
          {invoices.map((invoice) => (
            <option key={invoice.id} value={invoice.id}>
              {invoice.invoiceNumber ?? invoice.id} • {invoice.status}
            </option>
          ))}
        </select>
        <select
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          required
        >
          {PAYMENT_PROVIDERS.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        >
          {PAYMENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
          required
        >
          {COMMON_CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
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

      {editTarget ? (
        <form className="card form-grid" onSubmit={onSubmitEdit}>
          <h2>Edit Payment</h2>
          <select
            value={editForm.invoiceId}
            onChange={(e) =>
              setEditForm({ ...editForm, invoiceId: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select invoice
            </option>
            {invoices.map((invoice) => (
              <option key={invoice.id} value={invoice.id}>
                {invoice.invoiceNumber ?? invoice.id} • {invoice.status}
              </option>
            ))}
          </select>
          <select
            value={editForm.provider}
            onChange={(e) =>
              setEditForm({ ...editForm, provider: e.target.value })
            }
            required
          >
            {PAYMENT_PROVIDERS.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
          <select
            value={editForm.status}
            onChange={(e) =>
              setEditForm({ ...editForm, status: e.target.value })
            }
            required
          >
            {PAYMENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            value={editForm.currency}
            onChange={(e) =>
              setEditForm({ ...editForm, currency: e.target.value })
            }
            required
          >
            {COMMON_CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <input
            placeholder="Amount"
            type="number"
            value={editForm.amount}
            onChange={(e) =>
              setEditForm({ ...editForm, amount: Number(e.target.value) })
            }
            required
          />
          <input
            placeholder="Received At ISO"
            value={editForm.receivedAt}
            onChange={(e) =>
              setEditForm({ ...editForm, receivedAt: e.target.value })
            }
            required
          />
          <div className="actions-inline">
            <button className="btn" type="submit" disabled={updating}>
              {updating ? "Updating..." : "Save Changes"}
            </button>
            <button className="btn ghost" type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {isLoading ? (
        <div className="card">Loading payments...</div>
      ) : (
        <CommonDataTable
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
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <div className="actions-inline">
                  <button
                    className="btn ghost"
                    type="button"
                    onClick={() => onStartEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn danger"
                    type="button"
                    onClick={() => onDelete(row.id)}
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}

