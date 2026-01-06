"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "220px",
          padding: "20px",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link href="/admin" className="nav-item">
          Dashboard
        </Link>

        <Link href="/admin/products" className="nav-item">
          Products
        </Link>

        <Link href="/admin/add-product" className="nav-item">
          Add Product
        </Link>
        <Link href="/admin/admins" className="nav-item">
  Add Admin
</Link>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="nav-item logout"
          style={{
            marginTop: "auto",
            background: "none",
            border: "none",
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
