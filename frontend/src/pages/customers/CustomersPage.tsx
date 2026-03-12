import { FormEvent, useState } from "react";
import {
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "../../services/api";
import { CommonDataTable } from "../../utils/CommonDataTable";
import type { Customer } from "../../utils/types";
import {
  confirmDelete,
  toastError,
  toastSuccess,
  toastWarning,
} from "../../utils/notify";

export function CustomersPage() {
  const { data = [], isLoading, refetch } = useGetCustomersQuery();
  const [createCustomer, { isLoading: creating }] = useCreateCustomerMutation();
  const [updateCustomer, { isLoading: updating }] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    market: "Malaysia",
    preferredCurrency: "MYR",
  });

  const [editTarget, setEditTarget] = useState<Customer | null>(null);
  const [editForm, setEditForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    market: "",
    preferredCurrency: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createCustomer(form).unwrap();
      setForm({
        companyName: "",
        contactName: "",
        email: "",
        market: "Malaysia",
        preferredCurrency: "MYR",
      });
      toastSuccess("Customer created successfully");
      refetch();
    } catch {
      toastError("Failed to create customer");
    }
  }

  function onStartEdit(customer: Customer) {
    setEditTarget(customer);
    setEditForm({
      companyName: customer.companyName,
      contactName: customer.contactName,
      email: customer.email,
      market: customer.market,
      preferredCurrency: customer.preferredCurrency,
    });
  }

  function onCancelEdit() {
    setEditTarget(null);
    setEditForm({
      companyName: "",
      contactName: "",
      email: "",
      market: "",
      preferredCurrency: "",
    });
  }

  async function onSubmitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editTarget) return;

    try {
      await updateCustomer({
        id: editTarget.id,
        payload: {
          companyName: editForm.companyName,
          contactName: editForm.contactName,
          email: editForm.email,
          market: editForm.market,
          preferredCurrency: editForm.preferredCurrency,
        },
      }).unwrap();
      toastSuccess("Customer updated successfully");
      onCancelEdit();
      refetch();
    } catch {
      toastError("Failed to update customer");
    }
  }

  async function onDelete(id: string) {
    const shouldDelete = await confirmDelete("this customer");
    if (!shouldDelete) {
      toastWarning("Delete cancelled");
      return;
    }

    try {
      await deleteCustomer(id).unwrap();
      toastSuccess("Customer deleted successfully");
      refetch();
    } catch {
      toastError("Failed to delete customer");
    }
  }

  return (
    <div className="section-stack">
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Customers</h2>
        <input
          placeholder="Company Name"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          required
        />
        <input
          placeholder="Contact Name"
          value={form.contactName}
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Market"
          value={form.market}
          onChange={(e) => setForm({ ...form, market: e.target.value })}
          required
        />
        <input
          placeholder="Preferred Currency"
          value={form.preferredCurrency}
          onChange={(e) =>
            setForm({ ...form, preferredCurrency: e.target.value })
          }
          required
        />
        <button className="btn" type="submit" disabled={creating}>
          {creating ? "Saving..." : "Add Customer"}
        </button>
      </form>

      {editTarget ? (
        <form className="card form-grid" onSubmit={onSubmitEdit}>
          <h2>Edit Customer</h2>
          <input
            placeholder="Company Name"
            value={editForm.companyName}
            onChange={(e) =>
              setEditForm({ ...editForm, companyName: e.target.value })
            }
            required
          />
          <input
            placeholder="Contact Name"
            value={editForm.contactName}
            onChange={(e) =>
              setEditForm({ ...editForm, contactName: e.target.value })
            }
            required
          />
          <input
            placeholder="Email"
            type="email"
            value={editForm.email}
            onChange={(e) =>
              setEditForm({ ...editForm, email: e.target.value })
            }
            required
          />
          <input
            placeholder="Market"
            value={editForm.market}
            onChange={(e) =>
              setEditForm({ ...editForm, market: e.target.value })
            }
            required
          />
          <input
            placeholder="Preferred Currency"
            value={editForm.preferredCurrency}
            onChange={(e) =>
              setEditForm({ ...editForm, preferredCurrency: e.target.value })
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
        <div className="card">Loading customers...</div>
      ) : (
        <CommonDataTable
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "companyName", header: "Company" },
            { key: "contactName", header: "Contact" },
            { key: "email", header: "Email" },
            { key: "market", header: "Market" },
            { key: "preferredCurrency", header: "Currency" },
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

