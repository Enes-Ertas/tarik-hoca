"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!login || !password) {
      setError("Please fill in all fields!");
      return;
    }
    setError("");
    // Supabase ile giriş denemesi
    const { error: supaError } = await supabase.auth.signInWithPassword({
      email: login,
      password,
    });
    if (supaError) {
      setError(supaError.message);
      return;
    }

    // Başarılıysa ana sayfaya yönlendir
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
      <Header />

      <div className="container mx-auto pt-1">
        <div
          className="
            w-11/12 p-10 mx-auto mt-5 rounded-lg shadow-md bg-white
            sm:p-5 md:mt-15 md:w-6/12 md:p-10
            lg:mt-32 lg:w-5/12
            xl:w-4/12 xl:p-13
          "
        >
          <h1 className="text-2xl font-semibold text-gray-700 mb-3">
            Login
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            If you have not created an account yet, then please sign up first.{" "}
            <Link
              href="/signup"
              className="text-indigo-600 hover:underline"
            >
              Sign Up
            </Link>
            .
          </p>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Email */}
            <div>
              <label
                htmlFor="id_login"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Login
              </label>
              <input
                id="id_login"
                name="login"
                type="text"
                autoComplete="email"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="
                  w-full px-3 py-2
                  border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-300
                  text-[#4A00FF]
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="id_password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="id_password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-3 py-2
                  border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-300
                  text-[#4A00FF]
                "
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center my-2">
              <input
                id="id_remember"
                name="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="checkbox checkbox-accent"
              />
              <label
                htmlFor="id_remember"
                className="ml-2 text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                href="/accounts/password/reset"
                className="text-sm text-gray-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

           <button
  type="submit"
  className="
    w-full py-3
    bg-indigo-600 text-white font-medium
    rounded-md hover:bg-indigo-700 cursor-pointer
    transition-all duration-150 active:scale-95
  "
>
  Login
</button>

          </form>
        </div>
      </div>

      {/* alt nav */}
      <div className="mt-3 text-sm text-gray-700 flex flex-col items-center gap-3 md:flex-row">
        <Link href="/register" className="hover:underline">
          Sign Up
        </Link>
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </main>
  );
}
