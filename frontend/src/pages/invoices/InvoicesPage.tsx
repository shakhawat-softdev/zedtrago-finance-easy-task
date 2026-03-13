import { FormEvent, useState } from "react";
import { CommonDataTable } from "../../utils/CommonDataTable";
import {
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetBookingsQuery,
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
} from "../../services/api";
import type { Invoice } from "../../utils/types";
import {
  confirmDelete,
  toastError,
  toastSuccess,
  toastWarning,
} from "../../utils/notify";
import { COMMON_CURRENCIES, INVOICE_STATUSES } from "../../utils/formOptions";
import { FormModal } from "../../components/modal/FormModal";

export function InvoicesPage() {
  const { data = [], isLoading, refetch } = useGetInvoicesQuery();
  const { data: bookings = [] } = useGetBookingsQuery();
  const [createInvoice, { isLoading: creating }] = useCreateInvoiceMutation();
  const [updateInvoice, { isLoading: updating }] = useUpdateInvoiceMutation();
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [form, setForm] = useState({
    bookingId: "bok-1001",
    status: "issued",
    currency: "AUD",
    totalAmount: 2480,
    dueDate: "2026-03-20",
  });
  const [editTarget, setEditTarget] = useState<Invoice | null>(null);
  const [editForm, setEditForm] = useState({
    bookingId: "",
    invoiceNumber: "",
    status: "",
    currency: "",
    totalAmount: 0,
    dueDate: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createInvoice({
        ...form,
        totalAmount: Number(form.totalAmount),
      }).unwrap();
      setOpenCreateModal(false);
      toastSuccess("Invoice created successfully");
      refetch();
    } catch {
      toastError("Failed to create invoice");
    }
  }

  function onStartEdit(invoice: Invoice) {
    setEditTarget(invoice);
    setEditForm({
      bookingId: invoice.bookingId,
      invoiceNumber: invoice.invoiceNumber ?? "",
      status: invoice.status,
      currency: invoice.currency,
      totalAmount: invoice.totalAmount,
      dueDate: invoice.dueDate,
    });
  }

  function onCancelEdit() {
    setEditTarget(null);
    setEditForm({
      bookingId: "",
      invoiceNumber: "",
      status: "",
      currency: "",
      totalAmount: 0,
      dueDate: "",
    });
  }

  async function onSubmitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editTarget) return;

    try {
      await updateInvoice({
        id: editTarget.id,
        payload: {
          bookingId: editForm.bookingId,
          invoiceNumber: editForm.invoiceNumber,
          status: editForm.status,
          currency: editForm.currency,
          totalAmount: Number(editForm.totalAmount),
          dueDate: editForm.dueDate,
        },
      }).unwrap();
      toastSuccess("Invoice updated successfully");
      onCancelEdit();
      refetch();
    } catch {
      toastError("Failed to update invoice");
    }
  }

  async function onDelete(id: string) {
    const shouldDelete = await confirmDelete("this invoice");
    if (!shouldDelete) {
      toastWarning("Delete cancelled");
      return;
    }

    try {
      await deleteInvoice(id).unwrap();
      toastSuccess("Invoice deleted successfully");
      refetch();
    } catch {
      toastError("Failed to delete invoice");
    }
  }

  return (
    <div className="section-stack">
      <div className="card module-header">
        <h2>Invoices</h2>
        <button
          className="btn"
          type="button"
          onClick={() => setOpenCreateModal(true)}
        >
          Add Invoice
        </button>
      </div>

      <FormModal
        isOpen={openCreateModal}
        title="Add Invoice"
        onClose={() => setOpenCreateModal(false)}
      >
        <form className="form-grid" onSubmit={onSubmit}>
          {!bookings.length && (
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
              ⚠️ No bookings found. Please create a booking in the Bookings page
              first.
            </div>
          )}
          <select
            value={form.bookingId}
            onChange={(e) => setForm({ ...form, bookingId: e.target.value })}
            required
            disabled={!bookings.length}
          >
            <option value="" disabled>
              Select booking
            </option>
            {bookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.id} • {booking.bookingType} • {booking.status}
              </option>
            ))}
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
          >
            {INVOICE_STATUSES.map((status) => (
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
      </FormModal>

      {editTarget ? (
        <FormModal
          isOpen={!!editTarget}
          title="Edit Invoice"
          onClose={onCancelEdit}
        >
          <form className="form-grid" onSubmit={onSubmitEdit}>
            <select
              value={editForm.bookingId}
              onChange={(e) =>
                setEditForm({ ...editForm, bookingId: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select booking
              </option>
              {bookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.id} • {booking.bookingType} • {booking.status}
                </option>
              ))}
            </select>
            <input
              placeholder="Invoice Number"
              value={editForm.invoiceNumber}
              onChange={(e) =>
                setEditForm({ ...editForm, invoiceNumber: e.target.value })
              }
            />
            <select
              value={editForm.status}
              onChange={(e) =>
                setEditForm({ ...editForm, status: e.target.value })
              }
              required
            >
              {INVOICE_STATUSES.map((status) => (
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
              placeholder="Total Amount"
              type="number"
              value={editForm.totalAmount}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  totalAmount: Number(e.target.value),
                })
              }
              required
            />
            <input
              placeholder="Due Date YYYY-MM-DD"
              value={editForm.dueDate}
              onChange={(e) =>
                setEditForm({ ...editForm, dueDate: e.target.value })
              }
              required
            />
            <div className="actions-inline">
              <button className="btn" type="submit" disabled={updating}>
                {updating ? "Updating..." : "Save Changes"}
              </button>
              <button
                className="btn ghost"
                type="button"
                onClick={onCancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </FormModal>
      ) : null}

      {isLoading ? (
        <div className="card">Loading invoices...</div>
      ) : (
        <CommonDataTable
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "invoiceNumber", header: "Number" },
            { key: "bookingId", header: "Booking" },
            { key: "status", header: "Status" },
            { key: "currency", header: "Currency" },
            { key: "totalAmount", header: "Total" },
            { key: "dueDate", header: "Due Date" },
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
