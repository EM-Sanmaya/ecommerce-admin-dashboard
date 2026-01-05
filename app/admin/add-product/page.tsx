"use client";

import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("");
  const [image, setImage] = useState("");

  async function submit() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        price,
        units,
        image, // optional
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error adding product");
      return;
    }

    alert("Product added successfully!");
    setName("");
    setCategory("");
    setPrice("");
    setUnits("");
    setImage("");
  }

  return (
    <div style={{ padding: "30px", maxWidth: "400px" }}>
      <h1>Add Product</h1>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />

      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <br />

      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />

      <input placeholder="Units" value={units} onChange={(e) => setUnits(e.target.value)} />
      <br />

      <input
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br /><br />

      <button onClick={submit}>Add Product</button>
    </div>
  );
}
