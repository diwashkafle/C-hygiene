// app/(protected)/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProducts } from "@/lib/actions/products";
import DashboardClient from "@/components/Admin/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin-auth/login");
  }

  const result = await getProducts();
  const products = result.success && result.data ? result.data : [];

  return <DashboardClient initialProducts={products} />;
}