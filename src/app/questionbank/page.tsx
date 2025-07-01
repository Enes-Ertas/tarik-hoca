"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {QuestionType} from "@/app/types/types"
import QuestionChoices from "@/components/QuestionChoices";
import { useUser } from "@supabase/auth-helpers-react";


export default function QuestionBankPage() {
const [questions, setQuestions] = useState<QuestionType[]>([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedOption, setSelectedOption] = useState<string | null>(null);
const [isTrue, setIsTrue] = useState<boolean | null>(null);
const [wrongOptions, setWrongOptions] = useState<string[]>([]);
const [isCorrectAnswerFound, setIsCorrectAnswerFound] = useState<boolean | null>(null);
const [showChoiceIcons, setShowChoiceIcons] = useState(false);
const [isBookmarked, setIsBookmarked] = useState(false);
const [userId, setUserId] = useState<string | null>(null);



useEffect(() => {

  const fetchUser = async () => {
    // getSession() ile önceki getUser() yerine tüm session'ı alıyoruz
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Could not get session:", error);
      setUserId(null);
    } else {
      // session var ise içinden user.id geliyor
      setUserId(session?.user.id ?? null);
    }
  };
  fetchUser();
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

useEffect(() => {
  // Yeni soruya geçildiğinde durumları sıfırla
  setSelectedOption(null);
  setIsCorrectAnswerFound(null);
  setWrongOptions([]);
}, [currentIndex]);

const correctOption = questions[currentIndex]?.correct_option;


let checkButtonBg = "bg-gray-500 border-gray-700 text-[#E5E5ED]";
let checkButtonText = "Check";

if (isCorrectAnswerFound === true) {
  // Doğru cevap bulununca yeşil arkaplan
  checkButtonBg = "bg-[#00A96E] border-[#00A96E] text-white";
  checkButtonText = "Correct"; 
} else if (isCorrectAnswerFound === false) {
  // İlk yanlış cevap verildiyse kırmızı arkaplan
  checkButtonBg = "bg-[#FF5861] border-[#FF5861] text-white";
  checkButtonText = "Check Again";
} else if (selectedOption) {
  // Henüz ilk kontrol edilmediyse ama bir şık seçildiyse mavi arkaplan
  checkButtonBg = "bg-[#4A00FF] border-[#4A00FF] text-white";
}


const handleCheckClick = async () => {
  if (!selectedOption || isCorrectAnswerFound === true || !userId) return;

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion.correct_option;
  
  // Geçmiş cevaplara bak
    const { data: previousAnswers } = await supabase
      .from("user_answers")
      .select("is_correct")
      .eq("user_id", userId)
      .eq("question_id", currentQuestion.id);

  let answerType = "incorrect";
  if (isBookmarked) {
    answerType = "marked_for_review";
  } else if (isCorrect) {
    const hadWrongBefore = previousAnswers?.some((ans) => ans.is_correct === false);
    answerType = hadWrongBefore ? "correct_with_prior_incorrect" : "correct";
  }

  const { error } = await supabase.from("user_answers").upsert({
    user_id: userId,
    question_id: currentQuestion.id,
    selected_option: selectedOption,
    is_correct: isCorrect,
    answer_type: answerType,
      },
      { onConflict: "user_id,question_id" }
    );
  
  if (error) {
    console.error("Answer insert failed:", error);
  }

  if (isCorrect) {
    setIsCorrectAnswerFound(true);
  } else {
    setIsCorrectAnswerFound((prev) => (prev === null ? false : prev));
    setWrongOptions((prev) => [...prev, selectedOption]);
    setSelectedOption(null);
  }
};


  return (
    <main className="min-h-screen flex flex-col md:flex-row p-6 gap-6 text-[#1F2955] bg-white">
      {/* Sol Panel */}
<section className="md:w-2/3 space-y-6 py-12">
  <h1 className="text-3xl font-bold text-center text-[#1F2955]">
    SAT Suite Question Bank
  </h1>

  <p className="text-center text-sm text-gray-500">Question {currentIndex + 1} of {questions.length}</p>
    
    +  {/* Question ID Box for mobile view */}
  <div className="md:hidden bg-white p-4 rounded shadow text-sm">
    <div className="font-bold mb-2">
      Question ID: <span className="text-gray-600">#01081</span>
    </div>
    <div>Section: English</div>
    <div>Score Band: N/A</div>
    <div>Domain: N/A</div>
    <div>Skill: N/A</div>
  </div>


  <div className="bg-white border border-gray-200 text-[#1F2955] p-6 rounded-xl shadow-sm leading-relaxed text-lg mt-6">
   <p>{questions[currentIndex]?.question_text}</p>
  </div>
</section>




      {/* Sağ Panel */}
      <section className="md:w-1/3 space-y-4">
        <div className="hidden md:block bg-white p-4 rounded shadow text-sm">
          <div className="font-bold mb-2">Question ID: <span className="text-gray-600">#01081</span></div>
          <div>Section: English</div>
          <div>Score Band: N/A</div>
          <div>Domain: N/A</div>
          <div>Skill:N/A</div>
        </div>
           {/* Gri ayrım kutusu + içerik */}
   <div className="hidden md:flex items-center justify-between bg-gray-100 rounded px-4 py-2">
  <div className="flex items-center gap-2 text-sm text-gray-700">
<button onClick={() => setIsBookmarked((prev) => !prev)} className="hover:opacity-70 transition cursor-pointer">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={isBookmarked ? "#FFBE00" : "none"}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="md:size-7 size-6 text-gray-700"
  >
    {isBookmarked ? (
      <path
        fillRule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
        clipRule="evenodd"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    )}
  </svg>
</button>


   <span className="font-medium">
    {isBookmarked ? "Marked for Review" : "Mark for Review"}
  </span>
  </div>

  <button
    onClick={() => setShowChoiceIcons((prev) => !prev)}
    className="bg-gray-100 border border-gray-300 rounded-xl px-3 py-1.5 text-sm hover:bg-gray-200 transition hover:cursor-pointer active:scale-95 transition-transform"
  >
    <span className="line-through">ABC</span>
  </button>
</div>

        <div className="bg-white p-4 rounded shadow text-base space-y-3">

          {questions.length > 0 && (
        <QuestionChoices
 wrongOptions={wrongOptions}
  isCorrectAnswerFound={isCorrectAnswerFound}
  questions={questions}
  currentIndex={currentIndex}
  isModalOpen={isModalOpen}
  onCloseModal={() => setIsModalOpen(false)}
  selectedOption={selectedOption}
  setSelectedOption={setSelectedOption}
    showChoiceIcons={showChoiceIcons}
/>
          )}
        </div>

        <div className="flex justify-between items-center">

          
          <button className="bg-pink-500       inline-flex items-center px-4 py-2
      text-[#E5E5ED]  border border-pink-500 rounded-lg
      font-semibold text-sm hover:opacity-80 cursor-pointer"
      onClick={() => setIsModalOpen(true)}>Explanation</button>


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
<button
  onClick={handleCheckClick}
  disabled={!selectedOption}
  className={`
  inline-flex items-center px-4 py-2 font-semibold text-sm gap-x-1 border rounded-lg cursor-pointer
  ${
    isCorrectAnswerFound === true
      ? 'bg-[#00A96E] border-[#00A96E] text-white'      // Doğru
      : isCorrectAnswerFound === false
      ? 'bg-[#FF5861] border-[#FF5861] text-white'      // İlk yanlış ve devamı
      : selectedOption
      ? 'bg-[#4A00FF] border-[#4A00FF] text-white'      // Henüz kontrol edilmemiş seçim
      : 'bg-gray-500 border-gray-700 text-[#E5E5ED]'    // Hiçbir şey seçilmemiş
  }
  ${!selectedOption && isCorrectAnswerFound === null ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}
`}

>
  {checkButtonText}
</button>

</div>

        </div>
      </section>
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative animate-modal-open">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-4 ">Explanation</h2>
      <p className="text-sm text-[#1F2955] max-h-[70vh] overflow-y-auto pr-2 leading-6 ">
        {questions[currentIndex]?.explanation}
      </p>
    </div>
  </div>
)}

    </main>
  );
}
