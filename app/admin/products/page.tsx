"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [image, setImage] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    units: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    let mounted = true;

    async function load() {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      if (mounted) setProducts(data);
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  /* ================= ADD / UPDATE ================= */
  async function saveProduct() {
    if (!form.name || !form.category || !form.price || !form.units) {
      alert("Fill all fields");
      return;
    }

    let imageUrl: string | undefined;

    // Upload image if selected
    if (image) {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    if (editingId) {
      // UPDATE
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          name: form.name,
          category: form.category,
          price: Number(form.price),
          units: Number(form.units),
          ...(imageUrl && { image: imageUrl }),
        }),
      });
    } else {
      // ADD
      if (!imageUrl) {
        alert("Image is required for new product");
        return;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          price: Number(form.price),
          units: Number(form.units),
          image: imageUrl,
        }),
      });

      if (!res.ok) {
        alert("Add failed. Check backend.");
        return;
      }
    }

    // Reset form
    setForm({ name: "", category: "", price: "", units: "" });
    setImage("");
    setEditingId(null);

    // Refresh list
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    setProducts(data);
  }

  /* ================= DELETE ================= */
  async function deleteProduct(id: string) {
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });

    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    setProducts(data);
  }

  /* ================= EDIT ================= */
  function startEdit(p: Product) {
    setEditingId(p._id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      units: String(p.units),
    });
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>

      {/* FORM */}
      <div style={{ background: "#f1f5f9", padding: "20px", borderRadius: "10px" }}>
        <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="number"
          min={1}
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="number"
          min={1}
          placeholder="Units"
          value={form.units}
          onChange={(e) => setForm({ ...form, units: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
          }}
        />

        <button onClick={saveProduct} style={{ marginTop: "10px" }}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* TABLE */}
      <table border={1} cellPadding={10} width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Units</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.units}</td>
              <td>
                <button onClick={() => startEdit(p)}>Edit</button>{" "}
                <button
                  onClick={() => deleteProduct(p._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
