"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    
    setError("");
    console.log("LOGIN BUTTON CLICKED");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log("RESPONSE STATUS:", res.status);
    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin");
  }

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h1>Admin Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
