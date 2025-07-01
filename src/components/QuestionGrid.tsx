"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Difficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface QuestionGridProps {
  currentIndex: number
  onSelect: (index: number) => void
}

export default function QuestionGrid({ currentIndex, onSelect }: QuestionGridProps) {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([])
  console.log("QuestionGrid props:", { currentIndex, onSelect })


  useEffect(() => {
    const fetchDifficulties = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("difficulty")
        .order("id", { ascending: true })

      if (error) {
        console.error("Supabase error:", error)
        return
      }

      const cleaned = data
        .map((q) => q.difficulty)
        .filter((d): d is Difficulty => [1, 2, 3, 4, 5, 6, 7].includes(d))

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
      {difficulties.map((diff, i) => (
        <div
          key={i}
          onClick={() => onSelect(i)}
          className={`
            inline-flex items-end justify-center leading-none text-sm font-medium
            w-10 h-10
            pt-0 pb-1 px-3
            my-1 mx-0.5
            rounded-lg
            transition duration-200 ease-out
            ${
              i === currentIndex
                ? "bg-[#1F2937] text-white cursor-pointer"
                : `bg-white hover:bg-gray-100 cursor-pointer border border-solid ${getBorderColor(diff)} border-b-4`
            }
          `}
        >
          {i + 1}
        </div>
      ))}
    </div>
    </>
  )
}
