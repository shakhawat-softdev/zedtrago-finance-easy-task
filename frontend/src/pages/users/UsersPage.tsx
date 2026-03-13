import { FormEvent, useState } from "react";
import { CommonDataTable } from "../../utils/CommonDataTable";
import { useGetUsersQuery, useUpdateUserMutation } from "../../services/api";
import type { User } from "../../utils/types";
import { toastError, toastSuccess } from "../../utils/notify";
import { FormModal } from "../../components/modal/FormModal";

export function UsersPage() {
  const { data = [], isLoading, refetch } = useGetUsersQuery();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    role: "",
    status: "",
    region: "",
  });

  function onStartEdit(user: User) {
    setEditTarget(user);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      region: user.region,
    });
  }

  function onCancelEdit() {
    setEditTarget(null);
    setEditForm({ fullName: "", email: "", role: "", status: "", region: "" });
  }

  async function onSubmitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editTarget) return;

    try {
      await updateUser({ id: editTarget.id, payload: editForm }).unwrap();
      toastSuccess("User updated successfully");
      onCancelEdit();
      refetch();
    } catch {
      toastError("Failed to update user");
    }
  }

  return (
    <div className="section-stack">
      {editTarget ? (
        <FormModal
          isOpen={!!editTarget}
          title="Edit User"
          onClose={onCancelEdit}
        >
          <form className="form-grid" onSubmit={onSubmitEdit}>
            <input
              placeholder="Full Name"
              value={editForm.fullName}
              onChange={(event) =>
                setEditForm({ ...editForm, fullName: event.target.value })
              }
              required
            />
            <input
              placeholder="Email"
              type="email"
              value={editForm.email}
              onChange={(event) =>
                setEditForm({ ...editForm, email: event.target.value })
              }
              required
            />
            <input
              placeholder="Role"
              value={editForm.role}
              onChange={(event) =>
                setEditForm({ ...editForm, role: event.target.value })
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
            <input
              placeholder="Region"
              value={editForm.region}
              onChange={(event) =>
                setEditForm({ ...editForm, region: event.target.value })
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
        <div className="card">Loading users...</div>
      ) : (
        <CommonDataTable
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "fullName", header: "Name" },
            { key: "email", header: "Email" },
            { key: "role", header: "Role" },
            { key: "status", header: "Status" },
            { key: "region", header: "Region" },
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <button
                  className="btn ghost"
                  type="button"
                  onClick={() => onStartEdit(row)}
                >
                  Edit
                </button>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
