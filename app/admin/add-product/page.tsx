"use client";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("");
  const [image, setImage] = useState(""); // ✅ image URL

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
      alert(data.message || "Failed to add product");
      return;
    }

    alert("Product added successfully");
    router.push("/admin/products"); // go back to list
  }

  return (
    <div style={{ padding: "30px", maxWidth: "400px" }}>
      <h1>Add Product</h1>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <br /><br />

      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br /><br />

      <input placeholder="Units" value={units} onChange={(e) => setUnits(e.target.value)} />
      <br /><br />

      {/* ✅ IMAGE URL (OPTIONAL) */}
      <input
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br /><br />

      {/* Preview image */}
       {image && (
  <Image
    src={image}
    alt="Preview"
    width={120}
    height={120}
    style={{ marginBottom: "10px" }}
  />
)}


      <br />
      <button onClick={submit}>Add Product</button>
    </div>
  );
}
