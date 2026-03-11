import {
  useGetBookingsQuery,
  useGetCustomersQuery,
  useGetInvoicesQuery,
  useGetPaymentsQuery,
  useGetSuppliersQuery,
} from "../../services/api";

export function DashboardPage() {
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: bookings = [] } = useGetBookingsQuery();
  const { data: invoices = [] } = useGetInvoicesQuery();
  const { data: payments = [] } = useGetPaymentsQuery();
  const { data: suppliers = [] } = useGetSuppliersQuery();

  const invoiced = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const collected = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="page-grid">
      <div className="card kpi">
        <h3>{customers.length}</h3>
        <p>Customers</p>
      </div>
      <div className="card kpi">
        <h3>{bookings.length}</h3>
        <p>Bookings</p>
      </div>
      <div className="card kpi">
        <h3>{invoices.length}</h3>
        <p>Invoices</p>
      </div>
      <div className="card kpi">
        <h3>{payments.length}</h3>
        <p>Payments</p>
      </div>
      <div className="card kpi">
        <h3>{suppliers.length}</h3>
        <p>Suppliers</p>
      </div>
      <div className="card kpi">
        <h3>{invoiced.toFixed(2)}</h3>
        <p>Total Invoiced</p>
      </div>
      <div className="card kpi">
        <h3>{collected.toFixed(2)}</h3>
        <p>Total Collected</p>
      </div>
    </div>
  );
}
