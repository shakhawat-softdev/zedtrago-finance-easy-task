import { FormEvent, useState } from "react";
import { CommonDataTable } from "../../utils/CommonDataTable";
import {
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useGetCustomersQuery,
  useGetSuppliersQuery,
  useUpdateBookingMutation,
} from "../../services/api";
import { formatDate } from "../../utils/format";
import type { Booking } from "../../utils/types";
import {
  confirmDelete,
  toastError,
  toastSuccess,
  toastWarning,
} from "../../utils/notify";
import {
  BOOKING_STATUSES,
  BOOKING_TYPES,
  COMMON_CURRENCIES,
} from "../../utils/formOptions";
import { FormModal } from "../../components/modal/FormModal";

export function BookingsPage() {
  const { data = [], isLoading, refetch } = useGetBookingsQuery();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: suppliers = [] } = useGetSuppliersQuery();
  const [createBooking, { isLoading: creating }] = useCreateBookingMutation();
  const [updateBooking, { isLoading: updating }] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [form, setForm] = useState({
    customerId: "cus-001",
    supplierId: "sup-001",
    bookingType: "hotel",
    status: "confirmed",
    bookingCurrency: "AUD",
    grossAmount: 2500,
    netAmount: 2200,
    travelDate: "2026-04-18T00:00:00.000Z",
  });
  const [editTarget, setEditTarget] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState({
    customerId: "",
    supplierId: "",
    bookingType: "",
    status: "",
    bookingCurrency: "",
    grossAmount: 0,
    netAmount: 0,
    travelDate: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createBooking({
        ...form,
        grossAmount: Number(form.grossAmount),
        netAmount: Number(form.netAmount),
      }).unwrap();
      setOpenCreateModal(false);
      toastSuccess("Booking created successfully");
      refetch();
    } catch {
      toastError("Failed to create booking");
    }
  }

  function onStartEdit(booking: Booking) {
    setEditTarget(booking);
    setEditForm({
      customerId: booking.customerId,
      supplierId: booking.supplierId,
      bookingType: booking.bookingType,
      status: booking.status,
      bookingCurrency: booking.bookingCurrency,
      grossAmount: booking.grossAmount,
      netAmount: booking.netAmount,
      travelDate: booking.travelDate,
    });
  }

  function onCancelEdit() {
    setEditTarget(null);
    setEditForm({
      customerId: "",
      supplierId: "",
      bookingType: "",
      status: "",
      bookingCurrency: "",
      grossAmount: 0,
      netAmount: 0,
      travelDate: "",
    });
  }

  async function onSubmitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editTarget) return;

    try {
      await updateBooking({
        id: editTarget.id,
        payload: {
          ...editForm,
          grossAmount: Number(editForm.grossAmount),
          netAmount: Number(editForm.netAmount),
        },
      }).unwrap();
      toastSuccess("Booking updated successfully");
      onCancelEdit();
      refetch();
    } catch {
      toastError("Failed to update booking");
    }
  }

  async function onDelete(id: string) {
    const shouldDelete = await confirmDelete("this booking");
    if (!shouldDelete) {
      toastWarning("Delete cancelled");
      return;
    }

    try {
      await deleteBooking(id).unwrap();
      toastSuccess("Booking deleted successfully");
      refetch();
    } catch {
      toastError("Failed to delete booking");
    }
  }

  return (
    <div className="section-stack">
      <div className="card module-header">
        <h2>Bookings</h2>
        <button
          className="btn"
          type="button"
          onClick={() => setOpenCreateModal(true)}
        >
          Add Booking
        </button>
      </div>

      <FormModal
        isOpen={openCreateModal}
        title="Add Booking"
        onClose={() => setOpenCreateModal(false)}
      >
        <form className="form-grid" onSubmit={onSubmit}>
          {!customers.length && (
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
              ⚠️ No customers found. Please create a customer in the Customers
              page first.
            </div>
          )}
          {!suppliers.length && (
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
              ⚠️ No suppliers found. Please create a supplier in the Suppliers
              page first.
            </div>
          )}
          <select
            value={form.customerId}
            onChange={(e) => setForm({ ...form, customerId: e.target.value })}
            required
            disabled={!customers.length}
          >
            <option value="" disabled>
              Select customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.companyName} ({customer.id})
              </option>
            ))}
          </select>
          <select
            value={form.supplierId}
            onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
            required
            disabled={!suppliers.length}
          >
            <option value="" disabled>
              Select supplier
            </option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.supplierName} ({supplier.id})
              </option>
            ))}
          </select>
          <select
            value={form.bookingType}
            onChange={(e) => setForm({ ...form, bookingType: e.target.value })}
            required
          >
            {BOOKING_TYPES.map((bookingType) => (
              <option key={bookingType} value={bookingType}>
                {bookingType}
              </option>
            ))}
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
          >
            {BOOKING_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            value={form.bookingCurrency}
            onChange={(e) =>
              setForm({ ...form, bookingCurrency: e.target.value })
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
            placeholder="Gross Amount"
            type="number"
            value={Number.isNaN(form.grossAmount) ? "" : form.grossAmount}
            onChange={(e) =>
              setForm({
                ...form,
                grossAmount:
                  e.target.value === "" ? Number.NaN : Number(e.target.value),
              })
            }
            required
          />
          <input
            placeholder="Net Amount"
            type="number"
            value={Number.isNaN(form.netAmount) ? "" : form.netAmount}
            onChange={(e) =>
              setForm({
                ...form,
                netAmount:
                  e.target.value === "" ? Number.NaN : Number(e.target.value),
              })
            }
            required
          />
          <input
            placeholder="Travel Date ISO"
            value={form.travelDate}
            onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
            required
          />
          <button className="btn" type="submit" disabled={creating}>
            {creating ? "Saving..." : "Add Booking"}
          </button>
        </form>
      </FormModal>

      {editTarget ? (
        <FormModal
          isOpen={!!editTarget}
          title="Edit Booking"
          onClose={onCancelEdit}
        >
          <form className="form-grid" onSubmit={onSubmitEdit}>
            <select
              value={editForm.customerId}
              onChange={(e) =>
                setEditForm({ ...editForm, customerId: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.companyName} ({customer.id})
                </option>
              ))}
            </select>
            <select
              value={editForm.supplierId}
              onChange={(e) =>
                setEditForm({ ...editForm, supplierId: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select supplier
              </option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.supplierName} ({supplier.id})
                </option>
              ))}
            </select>
            <select
              value={editForm.bookingType}
              onChange={(e) =>
                setEditForm({ ...editForm, bookingType: e.target.value })
              }
              required
            >
              {BOOKING_TYPES.map((bookingType) => (
                <option key={bookingType} value={bookingType}>
                  {bookingType}
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
              {BOOKING_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              value={editForm.bookingCurrency}
              onChange={(e) =>
                setEditForm({ ...editForm, bookingCurrency: e.target.value })
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
              placeholder="Gross Amount"
              type="number"
              value={
                Number.isNaN(editForm.grossAmount) ? "" : editForm.grossAmount
              }
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  grossAmount:
                    e.target.value === "" ? Number.NaN : Number(e.target.value),
                })
              }
              required
            />
            <input
              placeholder="Net Amount"
              type="number"
              value={Number.isNaN(editForm.netAmount) ? "" : editForm.netAmount}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  netAmount:
                    e.target.value === "" ? Number.NaN : Number(e.target.value),
                })
              }
              required
            />
            <input
              placeholder="Travel Date ISO"
              value={editForm.travelDate}
              onChange={(e) =>
                setEditForm({ ...editForm, travelDate: e.target.value })
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
        <div className="card">Loading bookings...</div>
      ) : (
        <CommonDataTable
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "customerId", header: "Customer" },
            { key: "supplierId", header: "Supplier" },
            { key: "bookingType", header: "Type" },
            { key: "status", header: "Status" },
            { key: "bookingCurrency", header: "Currency" },
            { key: "grossAmount", header: "Gross" },
            { key: "netAmount", header: "Net" },
            {
              key: "travelDate",
              header: "Travel Date",
              render: (row) => formatDate(row.travelDate),
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
