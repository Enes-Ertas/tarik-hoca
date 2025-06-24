'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const ProfileButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerAllButtonPopsRef = useRef<() => void>(() => {});
    const router = useRouter();

      const onLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsOpen(false); // Menü kapat
      router.push("/"); // Ana sayfaya yönlendir
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    triggerAllButtonPopsRef.current = () => {
      const buttons = document.querySelectorAll('.button-pop');
      buttons.forEach((btn) => {
        btn.classList.remove('button-pop');
        void (btn as HTMLElement).offsetWidth;
        btn.classList.add('button-pop');
      });
    };
  }, []);

  const handleButtonClick = () => {
    triggerAllButtonPopsRef.current();
    setIsOpen((prev) => !prev); // Menü aç/kapa
  };


  

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleButtonClick}
        className="inline-flex items-center justify-center bg-gray-200 rounded-full p-4 hover:bg-gray-300 transition button-pop"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-gray-700"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
