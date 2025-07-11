"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Passwords do not match!");
      alert("Passwords do not match!");
      return;
    }
    setError("");
    const {   data: { user },
  error: signUpError, } = await supabase.auth.signUp({
      email,
      password: password1,
    });

     if (signUpError) {
  setError(signUpError.message)
  alert("E-mail error")
} else if (user) {
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    full_name: name,
    username: username,
    is_admin: false,
  })

    if (referralCode.trim() !== "") {
    const { data: refData, error: refError } = await supabase
      .from("referral_codes")
      .select("*")
      .eq("code", referralCode.trim())
      .eq("email", email.trim())
      .eq("used", false)
      .maybeSingle();

    if (refData) {
      await supabase
        .from("referral_codes")
        .update({ used: true })
        .eq("id", refData.id);
    }
  }
  if (profileError) {
    console.error("Profile insert error:", profileError.message)
    alert("Kayıt tamamlandı ama profil eklenemedi.")
  }

  setEmail("")
  setPassword1("")
  setPassword2("")
  setName("")
  setUsername("")
  setReferralCode("")
  setShowSuccessModal(true)
}

  };

  return (
    <main className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
      {/* Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-xl text-center">
            <h2 className="text-xl font-bold text-green-700 mb-2">Registration Successful 🎉</h2>
            <p className="text-sm text-gray-700 mb-4">✅ Please verify your email. Check your inbox.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto pt-1">
        <div
          className="w-11/12 p-10 mx-auto mt-5 rounded-lg shadow-md
            sm:p-5 md:mt-15 md:w-6/12 md:p-10
            lg:mt-32 lg:w-5/12
            xl:w-4/12 xl:p-13
            bg-white"
        >
          <h1 className="mb-3 text-gray-700 text-2xl font-semibold">Sign Up</h1>

          <p className="mb-6 text-gray-700 text-sm">
            Already have an account? Then please{" "}
            <Link href="/accounts/login/" className="text-indigo-600 hover:underline">
              sign in
            </Link>
            .
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" method="post">
            <div>
              <label htmlFor="id_name" className="block mb-1 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="id_name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]"
              />
            </div>

            <div>
              <label htmlFor="id_username" className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="id_username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]"
              />
            </div>

            <div>
              <label htmlFor="id_email" className="block mb-1 text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="id_email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]"
              />
            </div>

            <div>
              <label htmlFor="id_password1" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="id_password1"
                name="password1"
                type="password"
                required
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]"
              />
            </div>

            <div>
              <label htmlFor="id_password2" className="block mb-1 text-sm font-medium text-gray-700">
                Password (again)
              </label>
              <input
                id="id_password2"
                name="password2"
                type="password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]"
              />
            </div>

            <div>
              <label htmlFor="id_referral_code" className="block mb-1 text-sm font-medium text-gray-700">
                Referral Code (optional)
              </label>
              <input
                id="id_referral_code"
                name="referral_code"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-[#4A00FF]"
              />
            </div>

            {/* Bot spam için görünmeyen alan */}
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
  className="w-full py-3 bg-indigo-600 text-white font-medium rounded-md transition-all duration-150 active:scale-95 hover:bg-indigo-700 hover:cursor-pointer"
>
  Register
</button>

          </form>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700 flex flex-col items-center gap-3 md:flex-row">
        <Link href="/login" className="hover:underline">
          Login
        </Link>
        <Link href="/register" className="hover:underline cursor-pointer">
          Register
        </Link>
      </div>
    </main>
  );
}
