const features: { emoji: string; text: string }[] = [
  { emoji: "📑", text: "Seamless Question Navigation" },
  { emoji: "🧮", text: "Built-in Desmos Calculator" },
  { emoji: "🖊️", text: "Text Annotation (like Bluebook)" },
  { emoji: "✅", text: "Instant Feedback" },
  { emoji: "⏱️", text: "Per Question Timer" },
  { emoji: "🔖", text: "Bookmark Questions" },
  { emoji: "🔍", text: "Advanced Filtering" },
  { emoji: "📊", text: "Track Progress with Charts" },
  { emoji: "📈", text: "Advanced Question Bank Stats*" },
];

const Features: React.FC = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border rounded-lg shadow-sm p-4 text-left bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="text-2xl">{feature.emoji}</span>
            <span className="text-sm font-medium text-gray-800">{feature.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
