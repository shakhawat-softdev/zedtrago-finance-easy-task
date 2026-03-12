import { FormEvent, useMemo, useState } from "react";
import { Table } from "../../components/table/Table";
import {
  useCreateCurrencyRateMutation,
  useDeleteCurrencyRateMutation,
  useGetCurrencyRatesQuery,
  useUpdateCurrencyRateMutation,
} from "../../services/api";
import type { CurrencyRate } from "../../utils/types";
import { COMMON_CURRENCIES } from "../../utils/formOptions";
import {
  confirmDelete,
  toastError,
  toastSuccess,
  toastWarning,
} from "../../utils/notify";

type CurrencyRow = CurrencyRate & { id: string };

function getRateKey(rate: CurrencyRate) {
  return `${rate.fromCurrency}-${rate.toCurrency}`;
}

export function CurrencyPage() {
  const { data = [], isLoading, refetch } = useGetCurrencyRatesQuery();
  const [createCurrencyRate, { isLoading: creating }] =
    useCreateCurrencyRateMutation();
  const [updateCurrencyRate, { isLoading: updating }] =
    useUpdateCurrencyRateMutation();
  const [deleteCurrencyRate] = useDeleteCurrencyRateMutation();
  const [form, setForm] = useState<CurrencyRate>({
    fromCurrency: "AUD",
    toCurrency: "MYR",
    rate: 3.09,
    rateDate: "2026-03-10",
  });
  const [editTarget, setEditTarget] = useState<CurrencyRow | null>(null);
  const [editForm, setEditForm] = useState<CurrencyRate>({
    fromCurrency: "",
    toCurrency: "",
    rate: 0,
    rateDate: "",
  });

  const rows = useMemo<CurrencyRow[]>(
    () => data.map((rate) => ({ ...rate, id: getRateKey(rate) })),
    [data],
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createCurrencyRate({ ...form, rate: Number(form.rate) }).unwrap();
      toastSuccess("Currency rate created successfully");
      refetch();
    } catch {
      toastError("Failed to create currency rate");
    }
  }

  function onStartEdit(rate: CurrencyRow) {
    setEditTarget(rate);
    setEditForm({
      fromCurrency: rate.fromCurrency,
      toCurrency: rate.toCurrency,
      rate: rate.rate,
      rateDate: rate.rateDate,
    });
  }

  function onCancelEdit() {
    setEditTarget(null);
    setEditForm({ fromCurrency: "", toCurrency: "", rate: 0, rateDate: "" });
  }

  async function onSubmitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editTarget) return;

    try {
      await updateCurrencyRate({
        key: editTarget.id,
        payload: { ...editForm, rate: Number(editForm.rate) },
      }).unwrap();
      toastSuccess("Currency rate updated successfully");
      onCancelEdit();
      refetch();
    } catch {
      toastError("Failed to update currency rate");
    }
  }

  async function onDelete(key: string) {
    const shouldDelete = await confirmDelete("this FX rate");
    if (!shouldDelete) {
      toastWarning("Delete cancelled");
      return;
    }

    try {
      await deleteCurrencyRate(key).unwrap();
      toastSuccess("Currency rate deleted successfully");
      refetch();
    } catch {
      toastError("Failed to delete currency rate");
    }
  }

  return (
    <div className="section-stack">
      <form className="card form-grid" onSubmit={onSubmit}>
        <h2>Currency Rates</h2>
        <select
          value={form.fromCurrency}
          onChange={(event) =>
            setForm({ ...form, fromCurrency: event.target.value })
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
          value={form.toCurrency}
          onChange={(event) =>
            setForm({ ...form, toCurrency: event.target.value })
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
          placeholder="Rate"
          type="number"
          step="0.0001"
          value={form.rate}
          onChange={(event) =>
            setForm({ ...form, rate: Number(event.target.value) })
          }
          required
        />
        <input
          placeholder="Rate Date"
          value={form.rateDate}
          onChange={(event) =>
            setForm({ ...form, rateDate: event.target.value })
          }
          required
        />
        <button className="btn" type="submit" disabled={creating}>
          {creating ? "Saving..." : "Add Rate"}
        </button>
      </form>

      {editTarget ? (
        <form className="card form-grid" onSubmit={onSubmitEdit}>
          <h2>Edit Currency Rate</h2>
          <select
            value={editForm.fromCurrency}
            onChange={(event) =>
              setEditForm({ ...editForm, fromCurrency: event.target.value })
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
            value={editForm.toCurrency}
            onChange={(event) =>
              setEditForm({ ...editForm, toCurrency: event.target.value })
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
            placeholder="Rate"
            type="number"
            step="0.0001"
            value={editForm.rate}
            onChange={(event) =>
              setEditForm({ ...editForm, rate: Number(event.target.value) })
            }
            required
          />
          <input
            placeholder="Rate Date"
            value={editForm.rateDate}
            onChange={(event) =>
              setEditForm({ ...editForm, rateDate: event.target.value })
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
        <div className="card">Loading currency rates...</div>
      ) : (
        <Table
          data={rows}
          columns={[
            { key: "fromCurrency", header: "From" },
            { key: "toCurrency", header: "To" },
            { key: "rate", header: "Rate" },
            { key: "rateDate", header: "Rate Date" },
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
