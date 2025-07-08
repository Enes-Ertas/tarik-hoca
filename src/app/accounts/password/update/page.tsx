"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function PasswordUpdatePage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Kullanıcının gerçekten oturum açmış olduğunu Supabase kontrol eder
    // Bu sayfa sadece redirectTo sonrası erişilebilir olmalı
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setError("Oturum bulunamadı. Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş olabilir.");
      }
    };
    checkSession();
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Şifreler uyuşmuyor.");
      return;
    }
    setStatus("loading");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setStatus("error");
      setError(error.message);
    } else {
      setStatus("success");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handlePasswordUpdate} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Yeni Şifre Belirle</h2>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        {status === "success" && <p className="text-sm text-green-600 mb-3">Şifren başarıyla güncellendi. Yönlendiriliyorsun...</p>}

        <div className="mb-4">
  <label htmlFor="newPassword" className="block mb-1 text-sm text-gray-700">
    Yeni Şifre
  </label>
  <input
    id="newPassword"
    type="password"
    required
    placeholder="Yeni şifrenizi girin"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded 
               placeholder-gray-600 text-gray-900 font-medium"
  />
</div>

<div className="mb-6">
  <label htmlFor="confirmPassword" className="block mb-1 text-sm text-gray-700">
    Yeni Şifre (Tekrar)
  </label>
  <input
    id="confirmPassword"
    type="password"
    required
    placeholder="Yeni şifrenizi tekrar girin"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded 
               placeholder-gray-600 text-gray-900 font-medium"
  />
</div>


        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {status === "loading" ? "Güncelleniyor..." : "Şifreyi Güncelle"}
        </button>
      </form>
    </div>
  );
}
