import { FormEvent, useState } from "react";
import { CommonDataTable } from "../../utils/CommonDataTable";
import {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useGetSuppliersQuery,
  useUpdateSupplierMutation,
} from "../../services/api";
import type { Supplier } from "../../utils/types";
import {
  confirmDelete,
  toastError,
  toastSuccess,
  toastWarning,
} from "../../utils/notify";
import {
  COMMON_CURRENCIES,
  INTEGRATION_MODES,
  SUPPLIER_TYPES,
} from "../../utils/formOptions";

export function SuppliersPage() {
  const { data = [], isLoading, refetch } = useGetSuppliersQuery();
  const [createSupplier, { isLoading: creating }] = useCreateSupplierMutation();
  const [updateSupplier, { isLoading: updating }] = useUpdateSupplierMutation();
  const [deleteSupplier] = useDeleteSupplierMutation();
  const [form, setForm] = useState({
    supplierName: "",
    supplierType: "hotel",
    settlementCurrency: "AUD",
    integrationMode: "api",
  });
  const [editTarget, setEditTarget] = useState<Supplier | null>(null);
  const [editForm, setEditForm] = useState({
    supplierName: "",
    supplierType: "",
    settlementCurrency: "",
    integrationMode: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createSupplier(form).unwrap();
      setForm({
        supplierName: "",
        supplierType: "hotel",
        settlementCurrency: "AUD",
        integrationMode: "api",
      });
      toastSuccess("Supplier created successfully");
      refetch();
    } catch {
      toastError("Failed to create supplier");
    }
  }

  function onStartEdit(supplier: Supplier) {
    setEditTarget(supplier);
    setEditForm({
      supplierName: supplier.supplierName,
      supplierType: supplier.supplierType,
      settlementCurrency: supplier.settlementCurrency,
      integrationMode: supplier.integrationMode,
    });
  }

  function onCancelEdit() {
    setEditTarget(null);
    setEditForm({
      supplierName: "",
      supplierType: "",
      settlementCurrency: "",
      integrationMode: "",
    });
  }

  async function onSubmitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editTarget) return;

    try {
      await updateSupplier({ id: editTarget.id, payload: editForm }).unwrap();
      toastSuccess("Supplier updated successfully");
      onCancelEdit();
      refetch();
    } catch {
      toastError("Failed to update supplier");
    }
  }

  async function onDelete(id: string) {
    const shouldDelete = await confirmDelete("this supplier");
    if (!shouldDelete) {
      toastWarning("Delete cancelled");
      return;
    }

    try {
      await deleteSupplier(id).unwrap();
      toastSuccess("Supplier deleted successfully");
      refetch();
    } catch {
      toastError("Failed to delete supplier");
    }
  }

  return (
    <div className="section-stack">
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Suppliers</h2>
        <input
          placeholder="Supplier Name"
          value={form.supplierName}
          onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
          required
        />
        <select
          value={form.supplierType}
          onChange={(e) => setForm({ ...form, supplierType: e.target.value })}
          required
        >
          {SUPPLIER_TYPES.map((supplierType) => (
            <option key={supplierType} value={supplierType}>
              {supplierType}
            </option>
          ))}
        </select>
        <select
          value={form.settlementCurrency}
          onChange={(e) =>
            setForm({ ...form, settlementCurrency: e.target.value })
          }
          required
        >
          {COMMON_CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select
          value={form.integrationMode}
          onChange={(e) =>
            setForm({ ...form, integrationMode: e.target.value })
          }
          required
        >
          {INTEGRATION_MODES.map((integrationMode) => (
            <option key={integrationMode} value={integrationMode}>
              {integrationMode}
            </option>
          ))}
        </select>
        <button className="btn" type="submit" disabled={creating}>
          {creating ? "Saving..." : "Add Supplier"}
        </button>
      </form>

      {editTarget ? (
        <form className="card form-grid" onSubmit={onSubmitEdit}>
          <h2>Edit Supplier</h2>
          <input
            placeholder="Supplier Name"
            value={editForm.supplierName}
            onChange={(e) =>
              setEditForm({ ...editForm, supplierName: e.target.value })
            }
            required
          />
          <select
            value={editForm.supplierType}
            onChange={(e) =>
              setEditForm({ ...editForm, supplierType: e.target.value })
            }
            required
          >
            {SUPPLIER_TYPES.map((supplierType) => (
              <option key={supplierType} value={supplierType}>
                {supplierType}
              </option>
            ))}
          </select>
          <select
            value={editForm.settlementCurrency}
            onChange={(e) =>
              setEditForm({ ...editForm, settlementCurrency: e.target.value })
            }
            required
          >
            {COMMON_CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <select
            value={editForm.integrationMode}
            onChange={(e) =>
              setEditForm({ ...editForm, integrationMode: e.target.value })
            }
            required
          >
            {INTEGRATION_MODES.map((integrationMode) => (
              <option key={integrationMode} value={integrationMode}>
                {integrationMode}
              </option>
            ))}
          </select>
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
        <div className="card">Loading suppliers...</div>
      ) : (
        <CommonDataTable
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "supplierName", header: "Name" },
            { key: "supplierType", header: "Type" },
            { key: "settlementCurrency", header: "Currency" },
            { key: "integrationMode", header: "Integration" },
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

