// app/admin/components/AdminNav.tsx
"use client";
import Link from "next/link";

type AdminNavProps = {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
    };
  };
};

export default function AdminNav({ session }: AdminNavProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {session.user?.name}
            </span>
            <Link
              href="/admin-auth/signout"
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}