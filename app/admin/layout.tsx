import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("admin-auth");
  if (!isLoggedIn) redirect("/login");

  return (
    <div className="admin-root">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h1 className="logo">Admin Panel</h1>

        <nav className="nav">
          <Link href="/admin" className="nav-item">
            Dashboard
          </Link>
          <Link href="/admin/products" className="nav-item">
            Products
          </Link>
          <Link href="/admin/admins" className="nav-item">
            Add Admin
          </Link>
          <Link href="/api/auth/logout" className="nav-item logout">
            Logout
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="main">{children}</main>
    </div>
  );
}
