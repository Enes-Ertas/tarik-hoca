import { QuestionType } from "@/app/types/types";

type QuestionChoicesProps = {
  questions: QuestionType[];
  currentIndex: number;
  isModalOpen: boolean;
  onCloseModal: () => void;
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  isTrue: boolean | null;
  wrongOption: string | null;
};

export default function QuestionChoices({
  questions,
  currentIndex,
  isModalOpen,
  onCloseModal,
  selectedOption,
  setSelectedOption,
  isTrue,
  wrongOption,
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
        const isWrong = opt.letter === wrongOption;

        return (
          <div
            key={opt.letter}
            className={`flex flex-row items-center p-3 rounded-xl border ${
              isSelected
                ? isTrue === false
                  ? "border-[#FF5861]" // Yanlış seçiliyse kırmızı
                  : "border-[#4A00FF]" // Doğru ya da seçilmişse mavi
                : isWrong
                ? "border-[#FF5861]" // Yanlış seçenek seçildiğinde başka şık seçsen bile kırmızı
                : "border-neutral"
            }`}
          >
            <div
              onClick={() => setSelectedOption(opt.letter)}
              className={`w-7 h-7 border-2 rounded-full flex items-center justify-center font-bold cursor-auto ${
                isSelected
                  ? isTrue === false
                    ? "bg-[#FF5861] border-[#FF5861] text-white"
                    : "bg-[#4A00FF] border-[#4A00FF] text-white"
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
