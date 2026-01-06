"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ---------- TYPES ---------- */
type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  units: number;
  image?: string;
};

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- INITIAL FETCH ---------- */
  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data: Product[] = await res.json();
        if (active) setProducts(data);
      } catch {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  /* ---------- DELETE ---------- */
  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }

    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading products...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      {/* ---------- HEADER ---------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Products</h1>
        <button onClick={() => router.push("/admin/add-product")}>
          + Add Product
        </button>
      </div>

      {/* ---------- EMPTY ---------- */}
      {products.length === 0 && <p>No products found.</p>}

      {/* ---------- LIST ---------- */}
      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            marginTop: "15px",
            padding: "15px",
          }}
        >
          {/* IMAGE */}
          {p.image && (
            <div
              style={{
                width: "150px",
                height: "150px",
                position: "relative",
                marginBottom: "10px",
              }}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="150px"
                style={{ objectFit: "cover", borderRadius: "6px" }}
              />
            </div>
          )}

          <h3>{p.name}</h3>
          <p>Category: {p.category}</p>
          <p>Price: ₹{p.price}</p>
          <p>Units: {p.units}</p>

          {/* ACTIONS */}
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => router.push(`/admin/products/${p._id}`)}
              style={{ marginRight: "10px" }}
            >
              Update
            </button>

            <button
              onClick={() => deleteProduct(p._id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
