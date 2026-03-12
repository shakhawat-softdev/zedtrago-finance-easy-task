/**
 * API Services - Main re-export file
 *
 * All individual module services are now located in /modules/
 * This file re-exports all hooks for backward compatibility.
 *
 * Module structure:
 * - modules/authService.ts
 * - modules/customersService.ts
 * - modules/bookingsService.ts
 * - modules/invoicesService.ts
 * - modules/paymentsService.ts
 * - modules/suppliersService.ts
 * - modules/commissionsService.ts
 * - modules/currencyService.ts
 * - modules/usersService.ts
 * - modules/integrationsService.ts
 * - modules/ledgerService.ts
 * - modules/reportingService.ts
 */

// Re-export everything from modules
export * from "./modules";

// Re-export base API
export { baseApi as api } from "./baseApi";
