"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  product: {
    _id: string;
    name: string;
    category: string;
    price: number;
    units: number;
    image?: string;
  };
};

export default function EditProductForm({ product }: Props) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [units, setUnits] = useState(product.units);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // ✅ FORM DATA (NOT JSON)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", String(price));
    formData.append("units", String(units));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      body: formData, // ✅ IMPORTANT
    });

    setLoading(false);

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    router.refresh();
    alert("Product updated successfully");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Category</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Units</label>
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Change Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
