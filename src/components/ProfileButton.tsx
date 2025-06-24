 'use client';

 import Link from 'next/link';
 import { useState, useEffect, useRef } from 'react';

 /** 
  * Simple profile button placeholder.
  * You can later expand this into a dropdown, avatar upload, etc.
  */
 const ProfileButton: React.FC = () => {
   const triggerAllButtonPopsRef = useRef<() => void>(() => {});

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

   return (
     <Link
       href="/profile"
       onClick={() => triggerAllButtonPopsRef.current()}
       className="inline-flex items-center justify-center bg-gray-200 rounded-full p-4 hover:bg-gray-300 transition button-pop"
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         viewBox="0 0 24 24"
         className="w-6 h-6 text-gray-700"
       >
         <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
       </svg>
     </Link>
   );
 };

 export default ProfileButton;