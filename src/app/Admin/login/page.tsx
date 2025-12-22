"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // State untuk menyimpan input user
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API_HOST = "http://localhost:8001";

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(`${API_HOST}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login gagal");
      return;
    }

    // ✅ SIMPAN TOKEN
    localStorage.setItem("token", data.token);

    alert("Login berhasil!");
    router.push("/Admin/dashboard");
  } catch (error) {
    alert("Server error");
  }
};


  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/background-login.jpg')",
      }}
    >
      {/* Efek gradasi */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 via-blue-400/20 to-red-500/30 blur-3xl"></div>

      {/* Overlay transparan */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Card Login */}
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] p-10 w-[350px] text-center">
        <div className="mb-8">
          <img
            src="/logo-digiars.png"
            alt="DigiArs Logo"
            className="mx-auto h-20 mb-3"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-black/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 py-2 rounded-md bg-white/30 text-white placeholder-gray-200 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-black/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 9V7a5 5 0 1110 0v2h1a1 1 0 011 1v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a1 1 0 011-1h1zm2 0h6V7a3 3 0 00-6 0v2z" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 rounded-md bg-white/30 text-white placeholder-gray-200 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-500 hover:to-purple-400 transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
