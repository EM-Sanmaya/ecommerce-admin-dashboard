"use client";

import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function submit() {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    alert("Product added");
    setName("");
    setPrice("");
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Product</h1>

      <input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={submit}>Add</button>
    </div>
  );
}
