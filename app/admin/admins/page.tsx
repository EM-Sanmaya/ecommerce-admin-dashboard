"use client";

import { useState } from "react";

export default function AdminCreatePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createAdmin() {
    await fetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setEmail("");
    setPassword("");
    alert("Admin created");
  }

  return (
    <div className="card" style={{ maxWidth: 400 }}>
      <h2>Create New Admin</h2>

      <input className="input" placeholder="Email"
        value={email} onChange={(e) => setEmail(e.target.value)} />

      <input className="input" type="password" placeholder="Password"
        value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="btn btn-primary" onClick={createAdmin}>
        Create Admin
      </button>
    </div>
  );
}
