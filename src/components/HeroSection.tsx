const HeroSection: React.FC = () => {
  return (
    <div className="min-h-[55vh] bg-gradient-to-r from-indigo-500 to-purple-500 flex flex-col justify-center items-center text-center text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold">
        Your Ultimate Digital <span className="text-yellow-400 ">SAT</span>  Question Bank
      </h1>
      <p className="mt-4 text-lg">More than <strong>12,000</strong> questions</p>
      <div className="mt-6 flex flex-col gap-4 w-full max-w-md">
    <button
  className="
    inline-flex h-12 min-h-12 shrink-0 cursor-pointer select-none
    flex-wrap items-center justify-center rounded-lg px-4
    text-sm leading-none gap-2 font-semibold
    transition-colors duration-200 ease-out shadow-sm
    text-[#1F2955] bg-[#F2F2F2] button-pop
  "
>
  SAT Suite Question Bank
</button>


           <button
  className="
    inline-flex h-12 min-h-12  cursor-pointer 
    items-center justify-center rounded-lg px-4
    text-sm  gap-2 font-semibold
     shadow-sm
    text-[#1F2955] bg-[#F2F2F2] button-pop
  "
>Practice Tests</button>
           <button
  className="
    inline-flex h-12 min-h-12 shrink-0 cursor-pointer select-none
    flex-wrap items-center justify-center rounded-lg px-4
    text-sm leading-none gap-2 font-semibold
    transition-colors duration-200 ease-out shadow-sm
    text-[#1F2955] bg-[#F2F2F2] button-pop
  "
>
  The Princeton Review Practice Tests <br /> Question Bank
</button>

      </div>
    </div>
  );
};

export default HeroSection;
