import { FormEvent, useState } from "react";
import { CommonDataTable } from "../../utils/CommonDataTable";
import {
  useListIntegrationConnectorsQuery,
  useRunSyncJobMutation,
} from "../../services/api";
import type { SyncJobPayload } from "../../utils/types";
import {
  SYNC_JOB_MODES,
  SYNC_JOB_RESOURCES,
  SYNC_JOB_SOURCES,
} from "../../utils/formOptions";
import { toastError, toastSuccess } from "../../utils/notify";
import { FormModal } from "../../components/modal/FormModal";

export function IntegrationsPage() {
  const { data = [], isLoading } = useListIntegrationConnectorsQuery();
  const [runSyncJob, { isLoading: running }] = useRunSyncJobMutation();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [form, setForm] = useState<SyncJobPayload>({
    source: "hotel-supplier",
    mode: "pull",
    resource: "bookings",
  });
  const [lastResult, setLastResult] = useState<{
    status: string;
    correlationId: string;
    strategy: string;
  } | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const result = await runSyncJob(form).unwrap();
      setLastResult(result);
      setOpenCreateModal(false);
      toastSuccess("Sync job queued successfully");
    } catch {
      toastError("Failed to queue sync job");
    }
  }

  return (
    <div className="section-stack">
      <div className="card module-header">
        <h2>Integrations</h2>
        <button
          className="btn"
          type="button"
          onClick={() => setOpenCreateModal(true)}
        >
          Queue Sync Job
        </button>
      </div>

      <FormModal
        isOpen={openCreateModal}
        title="Queue Sync Job"
        onClose={() => setOpenCreateModal(false)}
      >
        <form className="form-grid" onSubmit={onSubmit}>
          <select
            value={form.source}
            onChange={(event) =>
              setForm({ ...form, source: event.target.value })
            }
            required
          >
            {SYNC_JOB_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
          <select
            value={form.mode}
            onChange={(event) =>
              setForm({
                ...form,
                mode: event.target.value as "pull" | "push" | "webhook",
              })
            }
            required
          >
            {SYNC_JOB_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          <select
            value={form.resource}
            onChange={(event) =>
              setForm({ ...form, resource: event.target.value })
            }
            required
          >
            {SYNC_JOB_RESOURCES.map((resource) => (
              <option key={resource} value={resource}>
                {resource}
              </option>
            ))}
          </select>
          <button className="btn" type="submit" disabled={running}>
            {running ? "Queueing..." : "Run Sync"}
          </button>
        </form>
      </FormModal>

      {lastResult ? (
        <article className="card insight-card">
          <span className="eyebrow-label">Latest Job</span>
          <h3>{lastResult.correlationId}</h3>
          <ul className="insight-list">
            <li>Status: {lastResult.status}</li>
            <li>Strategy: {lastResult.strategy}</li>
          </ul>
        </article>
      ) : null}

      {isLoading ? (
        <div className="card">Loading connectors...</div>
      ) : (
        <CommonDataTable
          data={data}
          columns={[
            { key: "name", header: "Connector" },
            { key: "auth", header: "Authentication" },
            { key: "retryPolicy", header: "Retry Policy" },
          ]}
        />
      )}
    </div>
  );
}
