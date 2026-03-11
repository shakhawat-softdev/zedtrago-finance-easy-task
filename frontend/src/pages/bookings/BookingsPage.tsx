import { FormEvent, useState } from "react";
import { Table } from "../../components/table/Table";
import {
  useCreateBookingMutation,
  useGetBookingsQuery,
} from "../../services/api";
import { formatDate } from "../../utils/format";
import { toastError, toastSuccess } from "../../utils/notify";

export function BookingsPage() {
  const { data = [], isLoading, refetch } = useGetBookingsQuery();
  const [createBooking, { isLoading: creating }] = useCreateBookingMutation();
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

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createBooking({
        ...form,
        grossAmount: Number(form.grossAmount),
        netAmount: Number(form.netAmount),
      }).unwrap();
      toastSuccess("Booking created successfully");
      refetch();
    } catch {
      toastError("Failed to create booking");
    }
  }

  return (
    <div className="section-stack">
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Bookings</h2>
        <input
          placeholder="Customer ID"
          value={form.customerId}
          onChange={(e) => setForm({ ...form, customerId: e.target.value })}
          required
        />
        <input
          placeholder="Supplier ID"
          value={form.supplierId}
          onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
          required
        />
        <input
          placeholder="Type"
          value={form.bookingType}
          onChange={(e) => setForm({ ...form, bookingType: e.target.value })}
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
          value={form.bookingCurrency}
          onChange={(e) =>
            setForm({ ...form, bookingCurrency: e.target.value })
          }
          required
        />
        <input
          placeholder="Gross Amount"
          type="number"
          value={form.grossAmount}
          onChange={(e) =>
            setForm({ ...form, grossAmount: Number(e.target.value) })
          }
          required
        />
        <input
          placeholder="Net Amount"
          type="number"
          value={form.netAmount}
          onChange={(e) =>
            setForm({ ...form, netAmount: Number(e.target.value) })
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

      {isLoading ? (
        <div className="card">Loading bookings...</div>
      ) : (
        <Table
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
          ]}
        />
      )}
    </div>
  );
}
