import { useEffect, useState } from "react";

interface PromptBuilderProps {
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
  autoPrompt?: string;
}

const predefinedStyles = [
  "Streetwear i storby",
  "Sommerdag i parken",
  "Fjelltur på høsten",
  "Kunstgalleri i Paris",
  "Minimalistisk business casual",
];

export default function PromptBuilder({ prompt, onPromptChange, autoPrompt }: PromptBuilderProps) {
  const [selectedStyle, setSelectedStyle] = useState("");

  useEffect(() => {
    if (autoPrompt) {
      onPromptChange(autoPrompt);
      setSelectedStyle("");
    }
  }, [autoPrompt]);

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
    onPromptChange(style);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Skriv inn ønsket stil og setting (valgfritt)</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => {
          onPromptChange(e.target.value);
          setSelectedStyle("");
        }}
        placeholder="Eks: Som på en fjelltur i oktober med boots og teknisk jakke"
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div>
        <label className="block text-sm font-medium mt-2">Eller velg en stil</label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {predefinedStyles.map((style) => (
            <button
              key={style}
              onClick={() => handleStyleSelect(style)}
              className={`px-3 py-2 text-sm rounded-xl border transition ${
                selectedStyle === style ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
