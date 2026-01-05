"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  async function submit() {
    let imageUrl = "";

    // ✅ DIRECT CLOUDINARY UPLOAD (CLIENT SIDE)
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "products_upload"); // 👈 important
      formData.append("cloud_name", "deiz3hkco");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/deiz3hkco/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      imageUrl = data.secure_url;
    }

    // ✅ CREATE PRODUCT (SAME AS YESTERDAY)
    const productRes = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        price,
        units,
        image: imageUrl, // URL stored
      }),
    });

    if (!productRes.ok) {
      alert("Failed to add product");
      return;
    }

    alert("Product added successfully");
    router.push("/admin/products");
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

      {/* ✅ REAL FILE PICKER */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
          }
        }}
      />
      <br /><br />

      {preview && (
        <Image src={preview} alt="Preview" width={120} height={120} />
      )}

      <br /><br />
      <button onClick={submit}>Add Product</button>
    </div>
  );
}
