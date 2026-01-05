"use client";
import Image from "next/image";

import { useEffect, useState } from "react";

/* ✅ Define Product type */
type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  units: number;
  image?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading products...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>

      {products.length === 0 && <p>No products found.</p>}

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <h3>{p.name}</h3>
          <p>Category: {p.category}</p>
          <p>Price: ₹{p.price}</p>
          <p>Units: {p.units}</p>

          {p.image && (
            <Image
  src={p.image}
  alt={p.name}
  width={120}
  height={120}
  style={{ marginTop: "10px" }}
/>

          )}
        </div>
      ))}
    </div>
  );
}
