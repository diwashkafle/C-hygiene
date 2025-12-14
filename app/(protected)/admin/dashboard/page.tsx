import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProducts, getCategories } from "@/lib/actions/products";
import DashboardClient from "@/components/Admin/DashboardClient";
export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin-auth/login");
  }

  const [productsResult, categoriesResult] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const products = productsResult.success && productsResult.data ? productsResult.data : [];
  const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];

  return <DashboardClient initialProducts={products} categories={categories} />;
}