"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {QuestionType} from "@/app/types/types"


export default function QuestionBankPage() {
const [questions, setQuestions] = useState<QuestionType[]>([]);
const [currentIndex, setCurrentIndex] = useState(0);
useEffect(() => {
  const fetchQuestions = async () => {
    const { data, error } = await supabase.from("questions").select("*").order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching questions:", error);
    } else {
      setQuestions(data);
    }
  };
  fetchQuestions();
}, []);
  return (
    <main className="min-h-screen flex flex-col md:flex-row p-6 gap-6 text-[#1F2955] bg-white">
      {/* Sol Panel */}
<section className="md:w-2/3 space-y-6 py-12">
  <h1 className="text-3xl font-bold text-center text-[#1F2955]">
    SAT Suite Question Bank
  </h1>

  <p className="text-center text-sm text-gray-500">Question {currentIndex + 1} of {questions.length}</p>
    
  <div className="bg-white border border-gray-200 text-[#1F2955] p-6 rounded-xl shadow-sm leading-relaxed text-lg mt-6">
   <p>{questions[currentIndex]?.question_text}</p>
  </div>
</section>




      {/* Sağ Panel */}
      <section className="md:w-1/3 space-y-4">
        <div className="bg-white p-4 rounded shadow text-sm">
          <div className="font-bold mb-2">Question ID: <span className="text-gray-600">#01081</span></div>
          <div>Section: English</div>
          <div>Score Band: N/A</div>
          <div>Domain: N/A</div>
          <div>Skill:N/A</div>
        </div>

        <div className="bg-white p-4 rounded shadow text-base space-y-3">
          <h2 className="font-semibold">
            Based on the text, what can be concluded about the diminishing popularity of the portrait miniature in the nineteenth century?
          </h2>
          <ul className="space-y-2">
            <li className="border p-3 rounded hover:bg-gray-100 cursor-pointer">🅐 Factors other than the rise of photography may be more directly responsible for the portrait miniature’s decline.</li>
            <li className="border p-3 rounded hover:bg-gray-100 cursor-pointer">🅑 Although portrait miniatures became less common than photographs, they were widely regarded as having more artistic merit.</li>
            <li className="border p-3 rounded hover:bg-gray-100 cursor-pointer">🅒 The popularity of the portrait miniature likely persisted for longer than art historians have assumed.</li>
            <li className="border p-3 rounded hover:bg-gray-100 cursor-pointer">🅓 As demand for portrait miniatures decreased, portrait artists likely shifted their creative focus to photography.</li>
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-pink-500 text-white font-semibold px-4 py-2 rounded shadow">Explanation</button>
         <div className="flex items-center justify-center gap-x-2">
  {/* Previous butonu */}
  <button
    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
    disabled={currentIndex === 0}
    className={`
      inline-flex items-center px-4 py-2
      text-[#E5E5ED] bg-[#2B3440] border border-[#464A58] rounded-lg
      font-semibold text-sm 
      ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'}
    `}
  >
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-4 h-4 "
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5l-7.5-7.5 7.5-7.5"
    />
  </svg>
    <span className="hidden md:inline-block">Previous</span>
  </button>

  {/* Next butonu */}
  <button
    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
    disabled={currentIndex === questions.length - 1}
    className={`
      inline-flex items-center px-4 py-2
      text-[#E5E5ED] bg-[#2B3440] border border-[#464A58] rounded-lg
      font-semibold text-sm gap-x-1
      ${currentIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'}
    `}
  >
    <span className="hidden md:inline-block">Next</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>

  {/* Check butonu */}
  <button className="px-3 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
    Check
  </button>
</div>

        </div>
      </section>
    </main>
  );
}
