import { baseApi } from "../baseApi";
import type {
  IntegrationConnector,
  SyncJobPayload,
  SyncJobResponse,
} from "../../utils/types";

export const integrationsService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listIntegrationConnectors: builder.query<IntegrationConnector[], void>({
      query: () => ({ url: "/integrations/connectors" }),
      providesTags: ["Integrations"],
    }),
    runSyncJob: builder.mutation<SyncJobResponse, SyncJobPayload>({
      query: (body) => ({
        url: "/integrations/sync-jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Integrations"],
    }),
  }),
});

export const { useListIntegrationConnectorsQuery, useRunSyncJobMutation } =
  integrationsService;
