'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';
import ProfileButton from './ProfileButton';

const Header: React.FC = () => {
    const router = useRouter();
  const triggerAllButtonPopsRef = useRef<() => void>(() => {});

  const [session, setSession] = useState<null | Session>(null);
  useEffect(() => {
    // initial session
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    // listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(s);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Bu sadece client tarafında çalışacak
    triggerAllButtonPopsRef.current = () => {
      const buttons = document.querySelectorAll('.button-pop');
      buttons.forEach((btn) => {
        btn.classList.remove('button-pop');
        void (btn as HTMLElement).offsetWidth;
        btn.classList.add('button-pop');
      });
    };
  }, []);
  return (
    <header className="bg-[#E3E9F4] py-3 px-6 flex justify-between items-center fixed top-0 left-0 w-full">
<Link
  href="/"
  onClick={() => triggerAllButtonPopsRef.current()}
  className="flex items-center gap-0 text-[#394E6A] font-bold text-lg border border-transparent bg-transparent shadow-none outline-current rounded-lg transition-colors duration-200 hover:bg-slate-300 px-3 py-1.5 cursor-pointer button-pop"
>
  <img
    src="/tarik-hoca-logo.png"
    alt="Tarık Hoca Logo"
    className="w-15 h-10"
  />
  Tarık Hoca
</Link>



      <nav className="hidden md:flex gap-8 text-sm text-[#394E6A]">
        <Link
  href="/"
  className="
    text-[#394E6A]
      border border-transparent
      bg-transparent
      shadow-none outline-current
      rounded-lg
      transition-colors duration-200
      hover:bg-slate-300
      px-3 py-1.5
      cursor-pointer
      button-pop
      flex items-center gap-x-2
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5 text-[#0069FF]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
  <span>Home</span>
</Link>

<Link
  href="/who-is-tarik-hoca"
  className="
    text-[#394E6A]
    border border-transparent
    bg-transparent
    shadow-none outline-current
    rounded-lg
    transition-colors duration-200
    hover:bg-slate-300
    px-3 py-1.5
    cursor-pointer
    button-pop
    flex items-center gap-x-2
  "
>
  <span>Who is Tarık Hoca</span>
</Link>


        <Link
  href="/questionbank"
  className="
    text-[#394E6A]
    border border-transparent
    bg-transparent
    shadow-none outline-current
    rounded-lg
    transition-colors duration-200
    hover:bg-slate-300
    px-3 py-1.5
    cursor-pointer
    button-pop
  "
>
  Question Bank
</Link>

 <Link
  href="/pricing"
  className="
    text-[#394E6A]
    border border-transparent
    bg-transparent
    shadow-none outline-current
    rounded-lg
    transition-colors duration-200
    hover:bg-slate-300
    px-3 py-1.5
    cursor-pointer
    button-pop
    flex items-center gap-x-2
  "
>
  <span>Pricing</span>
</Link>



      </nav>
      <div className="flex gap-2">





  {session ? (
<ProfileButton/>
  ) : (
    <>
      <Link
        href="/register"
        className="bg-[#463AA2]
    text-white
    px-4 py-2
    rounded-lg
    text-sm
    shadow-sm
    font-medium
    transition-transform duration-200
    active:scale-95
    hover:bg-[#3C318C]
    button-pop
    hover:cursor-pointer
    font-sans
    inline-flex items-center justify-center"
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        className="bg-[#0069FF]
    text-white
    px-4 py-2
    rounded-lg
    text-sm
    shadow-sm
    font-weight: 400
    transition-transform duration-200
    active:scale-95
    hover:bg-[#005AE5]
    button-pop
    px-4
    py-4
    hover:cursor-pointer
    font-sans"
      >
        Login
      </Link>
    </>
  )}
      </div>
    </header>
  );
};

export default Header;
