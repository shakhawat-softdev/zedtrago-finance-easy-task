import { FormEvent, useState } from "react";
import { CommonDataTable } from "../../utils/CommonDataTable";
import {
  useCreateCommissionMutation,
  useDeleteCommissionMutation,
  useGetBookingsQuery,
  useGetCommissionsQuery,
  useUpdateCommissionMutation,
} from "../../services/api";
import type { Commission } from "../../utils/types";
import {
  confirmDelete,
  toastError,
  toastSuccess,
  toastWarning,
} from "../../utils/notify";
import { COMMISSION_STATUSES } from "../../utils/formOptions";
import { FormModal } from "../../components/modal/FormModal";

export function CommissionsPage() {
  const { data = [], isLoading, refetch } = useGetCommissionsQuery();
  const { data: bookings = [] } = useGetBookingsQuery();
  const [createCommission, { isLoading: creating }] =
    useCreateCommissionMutation();
  const [updateCommission, { isLoading: updating }] =
    useUpdateCommissionMutation();
  const [deleteCommission] = useDeleteCommissionMutation();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [form, setForm] = useState({
    bookingId: "bok-1001",
    amount: 280,
    rate: 11.29,
    status: "accrued",
  });
  const [editTarget, setEditTarget] = useState<Commission | null>(null);
  const [editForm, setEditForm] = useState({
    bookingId: "",
    amount: 0,
    rate: 0,
    status: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createCommission({
        ...form,
        amount: Number(form.amount),
        rate: Number(form.rate),
      }).unwrap();
      setOpenCreateModal(false);
      toastSuccess("Commission created successfully");
      refetch();
    } catch {
      toastError("Failed to create commission");
    }
  }

  function onStartEdit(commission: Commission) {
    setEditTarget(commission);
    setEditForm({
      bookingId: commission.bookingId,
      amount: commission.amount,
      rate: commission.rate,
      status: commission.status,
    });
  }

  function onCancelEdit() {
    setEditTarget(null);
    setEditForm({ bookingId: "", amount: 0, rate: 0, status: "" });
  }

  async function onSubmitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editTarget) return;

    try {
      await updateCommission({
        id: editTarget.id,
        payload: {
          bookingId: editForm.bookingId,
          amount: Number(editForm.amount),
          rate: Number(editForm.rate),
          status: editForm.status,
        },
      }).unwrap();
      toastSuccess("Commission updated successfully");
      onCancelEdit();
      refetch();
    } catch {
      toastError("Failed to update commission");
    }
  }

  async function onDelete(id: string) {
    const shouldDelete = await confirmDelete("this commission record");
    if (!shouldDelete) {
      toastWarning("Delete cancelled");
      return;
    }

    try {
      await deleteCommission(id).unwrap();
      toastSuccess("Commission deleted successfully");
      refetch();
    } catch {
      toastError("Failed to delete commission");
    }
  }

  return (
    <div className="section-stack">
      <div className="card module-header">
        <h2>Commissions</h2>
        <button
          className="btn"
          type="button"
          onClick={() => setOpenCreateModal(true)}
        >
          Add Commission
        </button>
      </div>

      <FormModal
        isOpen={openCreateModal}
        title="Add Commission"
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
            onChange={(event) =>
              setForm({ ...form, bookingId: event.target.value })
            }
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
          <input
            placeholder="Amount"
            type="number"
            value={Number.isNaN(form.amount) ? "" : form.amount}
            onChange={(event) =>
              setForm({
                ...form,
                amount:
                  event.target.value === ""
                    ? Number.NaN
                    : Number(event.target.value),
              })
            }
            required
          />
          <input
            placeholder="Rate"
            type="number"
            step="0.01"
            value={Number.isNaN(form.rate) ? "" : form.rate}
            onChange={(event) =>
              setForm({
                ...form,
                rate:
                  event.target.value === ""
                    ? Number.NaN
                    : Number(event.target.value),
              })
            }
            required
          />
          <select
            value={form.status}
            onChange={(event) =>
              setForm({ ...form, status: event.target.value })
            }
            required
          >
            {COMMISSION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button className="btn" type="submit" disabled={creating}>
            {creating ? "Saving..." : "Add Commission"}
          </button>
        </form>
      </FormModal>

      {editTarget ? (
        <FormModal
          isOpen={!!editTarget}
          title="Edit Commission"
          onClose={onCancelEdit}
        >
          <form className="form-grid" onSubmit={onSubmitEdit}>
            <select
              value={editForm.bookingId}
              onChange={(event) =>
                setEditForm({ ...editForm, bookingId: event.target.value })
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
              placeholder="Amount"
              type="number"
              value={Number.isNaN(editForm.amount) ? "" : editForm.amount}
              onChange={(event) =>
                setEditForm({
                  ...editForm,
                  amount:
                    event.target.value === ""
                      ? Number.NaN
                      : Number(event.target.value),
                })
              }
              required
            />
            <input
              placeholder="Rate"
              type="number"
              step="0.01"
              value={Number.isNaN(editForm.rate) ? "" : editForm.rate}
              onChange={(event) =>
                setEditForm({
                  ...editForm,
                  rate:
                    event.target.value === ""
                      ? Number.NaN
                      : Number(event.target.value),
                })
              }
              required
            />
            <select
              value={editForm.status}
              onChange={(event) =>
                setEditForm({ ...editForm, status: event.target.value })
              }
              required
            >
              {COMMISSION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
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
        <div className="card">Loading commissions...</div>
      ) : (
        <CommonDataTable
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "bookingId", header: "Booking" },
            { key: "amount", header: "Amount" },
            { key: "rate", header: "Rate" },
            { key: "status", header: "Status" },
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
