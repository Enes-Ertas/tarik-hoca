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
}: QuestionChoicesProps) {
  const options = [
    { letter: "A", text: questions[currentIndex]?.option_a },
    { letter: "B", text: questions[currentIndex]?.option_b },
    { letter: "C", text: questions[currentIndex]?.option_c },
    { letter: "D", text: questions[currentIndex]?.option_d },
  ];

  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const isSelected = opt.letter === selectedOption;
        const isWrong = wrongOptions.includes(opt.letter);

        return (
          <div
            key={opt.letter}
            className={`flex flex-row items-center p-3 rounded-xl border ${
              isSelected
                ? "border-[#4A00FF]" // Şu an seçilen
                : isWrong
                ? "border-[#FF5861]" // Daha önce yanlış seçilen
                : "border-neutral"
            }`}
          >
            <div
              onClick={() => setSelectedOption(opt.letter)}
              className={`w-7 h-7 border-2 rounded-full flex items-center justify-center font-bold cursor-pointer ${
                isSelected
                  ? "bg-[#4A00FF] border-[#4A00FF] text-white"
                  : isWrong
                  ? "bg-[#FF5861] border-[#FF5861] text-white"
                  : "border-neutral text-primary"
              }`}
            >
              <span className="pointer-events-none select-none">{opt.letter}</span>
            </div>
            <p className="ml-3 flex-1 cursor-text select-none">{opt.text}</p>
          </div>
        );
      })}
    </div>
  );
}
