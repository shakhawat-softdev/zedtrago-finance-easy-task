import { FormEvent, useState } from "react";
import { Table } from "../../components/table/Table";
import {
  useCreateCommissionMutation,
  useDeleteCommissionMutation,
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

export function CommissionsPage() {
  const { data = [], isLoading, refetch } = useGetCommissionsQuery();
  const [createCommission, { isLoading: creating }] =
    useCreateCommissionMutation();
  const [updateCommission, { isLoading: updating }] =
    useUpdateCommissionMutation();
  const [deleteCommission] = useDeleteCommissionMutation();
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
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Commissions</h2>
        <input
          placeholder="Booking ID"
          value={form.bookingId}
          onChange={(event) =>
            setForm({ ...form, bookingId: event.target.value })
          }
          required
        />
        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(event) =>
            setForm({ ...form, amount: Number(event.target.value) })
          }
          required
        />
        <input
          placeholder="Rate"
          type="number"
          step="0.01"
          value={form.rate}
          onChange={(event) =>
            setForm({ ...form, rate: Number(event.target.value) })
          }
          required
        />
        <input
          placeholder="Status"
          value={form.status}
          onChange={(event) => setForm({ ...form, status: event.target.value })}
          required
        />
        <button className="btn" type="submit" disabled={creating}>
          {creating ? "Saving..." : "Add Commission"}
        </button>
      </form>

      {editTarget ? (
        <form className="card form-grid" onSubmit={onSubmitEdit}>
          <h2>Edit Commission</h2>
          <input
            placeholder="Booking ID"
            value={editForm.bookingId}
            onChange={(event) =>
              setEditForm({ ...editForm, bookingId: event.target.value })
            }
            required
          />
          <input
            placeholder="Amount"
            type="number"
            value={editForm.amount}
            onChange={(event) =>
              setEditForm({ ...editForm, amount: Number(event.target.value) })
            }
            required
          />
          <input
            placeholder="Rate"
            type="number"
            step="0.01"
            value={editForm.rate}
            onChange={(event) =>
              setEditForm({ ...editForm, rate: Number(event.target.value) })
            }
            required
          />
          <input
            placeholder="Status"
            value={editForm.status}
            onChange={(event) =>
              setEditForm({ ...editForm, status: event.target.value })
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
        <div className="card">Loading commissions...</div>
      ) : (
        <Table
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
                  <button className="btn ghost" type="button" onClick={() => onStartEdit(row)}>
                    Edit
                  </button>
                  <button className="btn danger" type="button" onClick={() => onDelete(row.id)}>
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