import { redirect } from "next/navigation";

// The root of the dashboard redirects to Financial Reporting.
export default function DashboardRoot() {
  redirect("/reporting");
}
