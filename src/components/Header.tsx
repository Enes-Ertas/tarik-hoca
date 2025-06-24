'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
    const router = useRouter();
    const triggerAllButtonPops = () => {
  const buttons = document.querySelectorAll('.button-pop');

  buttons.forEach((btn) => {
    btn.classList.remove('button-pop');
    void (btn as HTMLElement).offsetWidth; // reflow tetikle
    btn.classList.add('button-pop');
  });
};
  return (
    <header className="bg-[#E3E9F4] py-3 px-6 flex justify-between items-center fixed top-0 left-0 w-full">
<button
  onClick={() => window.location.href = '/'}
  className="text-[#394E6A] font-bold text-lg border border-transparent bg-transparent shadow-none outline-current rounded-lg transition-colors duration-200 hover:bg-slate-300 px-3 py-1.5 cursor-pointer button-pop"
>
  Tarık Hoca
</button>


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
  href="/donate"
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
      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
  <span>Practice Tests</span>
</Link>

        <Link
  href="#"
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
  Question Banks
</Link>

      <Link
  href="#"
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
  {/* SVG ikon */}
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
      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
    />
  </svg>
  <span>Charts</span>
</Link>


       <Link
  href="/donate"
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
  {/* SVG ikon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5 text-[#05AB71]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
  <span>Donate</span>
</Link>

      </nav>
      <div className="flex gap-2">
        <button
  className="
    bg-[#463AA2]
    text-white
    px-4 py-2
    rounded-lg
    text-sm
    shadow-sm
    font-weight: 400
    transition-transform duration-200
    active:scale-95
    hover:bg-[#3C318C]
    button-pop
    px-4
    py-4
    hover:cursor-pointer
    font-sans
  "
>
  Register
</button>

                <button
  className="
    bg-[#0069FF]
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
    font-sans
  "
>Login</button>
      </div>
    </header>
  );
};

export default Header;
