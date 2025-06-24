// src/app/register/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";


export default function RegisterPage() {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Şifreler eşleşmiyor!");
      alert("Şifreler eşleşmiyor")
      return;
    }
    setError("");
    // TODO: API çağrısı vs.
    alert("Kayıt başarılı!");
  };
  return (
    <main className="min-h-screen bg-gray-200 flex flex-col items-center p-4">

      <div className="container mx-auto pt-1">
        <div
          className="
            w-11/12 p-10 mx-auto mt-5 rounded-lg shadow-md
            sm:p-5 md:mt-15 md:w-6/12 md:p-10
            lg:mt-32 lg:w-5/12
            xl:w-4/12 xl:p-13
            bg-white
          "
        >
          <h1 className="mb-3 text-gray-700 text-2xl font-semibold">Register</h1>
          <p className="mb-6 text-gray-700 text-sm">
            Already have an account? Then please{" "}
            <Link href="/accounts/login/" className="text-indigo-600 hover:underline">
              sign in
            </Link>
            .
          </p>

          <form
          onSubmit={handleSubmit}
            className="space-y-4"
            method="post"
            action="/accounts/signup/"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="id_name"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="id_name"
                name="name"
                type="text"
                required
                className="
                  w-full px-3 py-2
                  border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]
                "
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="id_username"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="id_username"
                name="username"
                type="text"
                required
                className="
                  w-full px-3 py-2
                  border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-300
                 text-[#4A00FF]
                "
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="id_email"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                id="id_email"
                name="email"
                type="email"
                required
                className="
                  w-full px-3 py-2
                  border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="id_password1"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="id_password1"
                name="password1"
                type="password"
                required
                onChange={e => setPassword1(e.target.value)}
                className="
                  w-full px-3 py-2
                  border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]
                "
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="id_password2"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password (again)
              </label>
              <input
                id="id_password2"
                name="password2"
                type="password"
                required
                onChange={e => setPassword2(e.target.value)}
                className="
                  w-full px-3 py-2
                  border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]
                "
              />
            </div>

            {/* Referral Code (optional) */}
            <div>
              <label
                htmlFor="id_referral_code"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Referral Code (optional)
              </label>
              <input
                id="id_referral_code"
                name="referral_code"
                type="text"
                className="
                  w-full px-3 py-2
                  border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]
                "
              />
            </div>

            {/* Honeypot field */}
            <input
              id="id_address"
              name="address"
              type="text"
              tabIndex={-1}
              autoComplete="nope"
              className="absolute left-[-9999px] w-0 h-0"
            />

            <button
              type="submit"
              className="
                w-full py-3
                bg-indigo-600 text-white font-medium
                rounded-md hover:bg-indigo-700 cursor-pointer
                transition-colors 
              "
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700 flex flex-col items-center gap-3 md:flex-row">
        <Link href="/accounts/login/" className="hover:underline">
          Login
        </Link>
        <Link href="/accounts/signup/" className="hover:underline cursor-pointer">
          Register
        </Link>
      </div>
    </main>
  );
}
