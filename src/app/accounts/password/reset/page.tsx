"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/accounts/password/update", // değiştirmen gerekebilir
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Forgot password?</h2>
        <p className="text-sm mb-4 text-gray-600">
          Enter your email address to reset your password.
        </p>
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
       <input
  type="email"
  placeholder="E-posta adresin"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="w-full px-3 py-2 border border-gray-300 rounded mb-4
             placeholder-gray-500 text-gray-900 font-medium"
/>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Send reset link
        </button>
      </form>
    </div>
  );
}
