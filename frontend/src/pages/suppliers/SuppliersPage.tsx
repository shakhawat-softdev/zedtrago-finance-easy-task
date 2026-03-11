import { FormEvent, useState } from "react";
import { Table } from "../../components/table/Table";
import {
  useCreateSupplierMutation,
  useGetSuppliersQuery,
} from "../../services/api";
import { toastError, toastSuccess } from "../../utils/notify";

export function SuppliersPage() {
  const { data = [], isLoading, refetch } = useGetSuppliersQuery();
  const [createSupplier, { isLoading: creating }] = useCreateSupplierMutation();
  const [form, setForm] = useState({
    supplierName: "",
    supplierType: "hotel",
    settlementCurrency: "AUD",
    integrationMode: "api",
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
        <input
          placeholder="Supplier Type"
          value={form.supplierType}
          onChange={(e) => setForm({ ...form, supplierType: e.target.value })}
          required
        />
        <input
          placeholder="Settlement Currency"
          value={form.settlementCurrency}
          onChange={(e) =>
            setForm({ ...form, settlementCurrency: e.target.value })
          }
          required
        />
        <input
          placeholder="Integration Mode"
          value={form.integrationMode}
          onChange={(e) =>
            setForm({ ...form, integrationMode: e.target.value })
          }
          required
        />
        <button className="btn" type="submit" disabled={creating}>
          {creating ? "Saving..." : "Add Supplier"}
        </button>
      </form>

      {isLoading ? (
        <div className="card">Loading suppliers...</div>
      ) : (
        <Table
          data={data}
          columns={[
            { key: "id", header: "ID" },
            { key: "supplierName", header: "Name" },
            { key: "supplierType", header: "Type" },
            { key: "settlementCurrency", header: "Currency" },
            { key: "integrationMode", header: "Integration" },
          ]}
        />
      )}
    </div>
  );
}
