import { useState } from "react";

type PromptBuilderProps = {
  prompt: string;
  setPrompt: (value: string) => void;
};

const suggestions = [
  "Dinner party",
  "Hike in the mountains",
  "Urban streetwear",
  "Business casual",
  "Beach vacation",
  "Music festival",
  "First date",
  "Weekend cabin getaway",
];

export default function PromptBuilder({ prompt, setPrompt }: PromptBuilderProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSuggestionClick = (value: string) => {
    setSelected(value);
    setPrompt(value);
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium">Describe your desired style or setting</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          setSelected(null);
        }}
        placeholder="e.g. Casual fall outfit in the city"
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
      />

      <div className="flex flex-wrap gap-2 mt-1">
        {suggestions.map((text) => (
          <button
            key={text}
            onClick={() => handleSuggestionClick(text)}
            className={`px-3 py-1 rounded-full border text-sm ${
              selected === text ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
