import { useState } from "react";
import { QuestionType } from "@/app/types/types";

type QuestionChoicesProps = {
  questions: QuestionType[];
  currentIndex: number;
  isModalOpen: boolean;
  onCloseModal: () => void;
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  isCorrectAnswerFound: boolean | null;
  wrongOptions: string[];
  showChoiceIcons: boolean;
};

export default function QuestionChoices({
  questions,
  currentIndex,
  isModalOpen,
  onCloseModal,
  selectedOption,
  setSelectedOption,
  isCorrectAnswerFound,
  wrongOptions,
  showChoiceIcons,
}: QuestionChoicesProps) {
  const options = [
    { letter: "A", text: questions[currentIndex]?.option_a },
    { letter: "B", text: questions[currentIndex]?.option_b },
    { letter: "C", text: questions[currentIndex]?.option_c },
    { letter: "D", text: questions[currentIndex]?.option_d },
  ];

  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);

  const toggleDisabled = (letter: string) => {
    setDisabledOptions((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded shadow text-base">
      {options.map((opt) => {
        const isSelected = opt.letter === selectedOption;
        const isWrong = wrongOptions.includes(opt.letter);
        const isCorrectOption =
          opt.letter === questions[currentIndex]?.correct_option;
        const isDisabled = disabledOptions.includes(opt.letter);

        return (
          <div
            key={opt.letter}
            className={`flex items-center justify-between p-3 rounded-xl border ${
              isCorrectAnswerFound === true && isCorrectOption
                ? "border-[#00A96E]"
                : isSelected
                ? "border-[#4A00FF]"
                : isWrong
                ? "border-[#FF5861]"
                : "border-neutral"
            }`}
          >
            <div className="flex items-center w-full max-w-[90%]">
              <div
                onClick={() => {
                  if (!isDisabled) {
                    setSelectedOption(opt.letter);
                  }
                }}
                className={`w-7 aspect-square border-2 rounded-full flex items-center justify-center font-bold shrink-0 ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                } ${
                  isCorrectAnswerFound === true && isCorrectOption
                    ? "bg-[#00A96E] border-[#00A96E] text-white"
                    : isSelected
                    ? "bg-[#4A00FF] border-[#4A00FF] text-white"
                    : isWrong
                    ? "bg-[#FF5861] border-[#FF5861] text-white"
                    : "border-neutral text-primary"
                }`}
              >
                <span className={`pointer-events-none select-none ${isDisabled ? "line-through" : ""}`}>
                  {opt.letter}
                </span>
              </div>
              <p
                className={`ml-3 select-none ${
                  isDisabled ? "line-through text-gray-400" : ""
                }`}
              >
                {opt.text}
              </p>
            </div>

            {showChoiceIcons && (
              <button
                onClick={() => toggleDisabled(opt.letter)}
                className="ml-4 w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full bg-white shadow-sm shrink-0 hover:cursor-pointer"
              >
                <span className="line-through">{opt.letter}</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
