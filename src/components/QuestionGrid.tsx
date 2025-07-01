"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Difficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface QuestionGridProps {
  currentIndex: number
  onSelect: (index: number) => void
  userId: string | null
}

export default function QuestionGrid({ currentIndex, onSelect, userId }: QuestionGridProps) {
const [difficulties, setDifficulties] = useState<{ id: string; difficulty: Difficulty }[]>([])
  const [answerMap, setAnswerMap] = useState<Record<string, string>>({})
  console.log("QuestionGrid props:", { currentIndex, onSelect })


useEffect(() => {
  if (!userId) return
  const fetchAnswers = async () => {
    const { data, error } = await supabase
      .from("user_answers")
      .select("question_id, answer_type")
      .eq("user_id", userId)
    if (!error && data) {
      const map: Record<string,string> = {}
      data.forEach(a => map[a.question_id.toString()] = a.answer_type)
      console.log("▶ fetched answerMap:", map)
      setAnswerMap(map)
    }
  }
  fetchAnswers()
}, [userId])


useEffect(() => {
  const fetchDifficulties = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("id, difficulty")
      .order("created_at", { ascending: true })  // ← burayı değiştiriyoruz

    if (error) {
      console.error("Supabase error:", error)
      return
    }

    // tip güvenliği için yine temizleyip state'e at
    const cleaned = (data ?? [])
      .filter((q): q is { id: string; difficulty: Difficulty } =>
        [1,2,3,4,5,6,7].includes(q.difficulty as any)
      )
      .map(q => ({ id: q.id, difficulty: q.difficulty as Difficulty }))

    console.log("▶ sorted difficulties:", cleaned.map(c => c.id))
    setDifficulties(cleaned)
  }

  fetchDifficulties()
}, [])


  const getBorderColor = (d: Difficulty) => {
    if (d <= 3) return "border-green-500"
    if (d <= 5) return "border-yellow-400"
    return "border-red-500"
  }

  return (
    <>
      {/* Legend */}
      <div className="flex space-x-4 items-center mb-4 text-sm pl-8">
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <span>Correct</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
          <span>Incorrect</span>
       </div>
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: 'linear-gradient(to right, #00A96E 50%, #FF5861 50%)' }}
          ></span>
          <span>Correct (with prior incorrect attempt)</span>
        </div>
        <div className="flex items-center space-x-1">
         <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
          <span>Marked for Review</span>
        </div>
      </div>

<div className="flex flex-wrap gap-2 w-full p-6">
  {difficulties.map(({ id, difficulty }, i) => {
  // status artık doğrudan question_id === id ile eşleşiyor
  const status = answerMap[id]
  console.log(`▶ box index=${i+1}, id=${id}, status=${status}`)

  return (
    <div
      key={id}
      onClick={() => onSelect(i)}
      className={`
        relative inline-flex items-end justify-center leading-none text-sm font-medium
        w-10 h-10
        pt-0 pb-1 px-3
        my-1 mx-0.5
        rounded-lg
        transition duration-200 ease-out
        ${
          i === currentIndex
            ? "bg-[#1F2937] text-white cursor-pointer"
            : `bg-white hover:bg-gray-100 cursor-pointer border border-solid ${getBorderColor(difficulty)} border-b-4`
        }
      `}
    >
      {i + 1}
      <span
        className={`
          absolute w-3 h-3 rounded-full top-0.5 right-0.5
          ${
            status === "correct"
              ? "bg-green-500"
              : status === "incorrect"
              ? "bg-red-500"
              : status === "correct_with_prior_incorrect"
              ? "bg-gradient-to-br from-green-500 to-red-500"
              : status === "marked_for_review"
              ? "bg-yellow-400"
              : "hidden"
          }
        `}
      ></span>
    </div>
  )
})}

</div>

    </>
  )
}
