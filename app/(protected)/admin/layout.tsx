import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminNav from "@/components/Admin/AdminNav";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin-auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav session={session} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
       <Link href={"/"}>
        <div className="mb-4 mx-2 flex items-center border border-gray-400 rounded-4xl w-40 px-2 py-1 gap-2 text-gray-600 hover:text-gray-900 cursor-pointer">
          <MoveLeft/> <span>back to Home</span>
        </div>
       </Link>
        {children}
      </main>
    </div>
  );
}