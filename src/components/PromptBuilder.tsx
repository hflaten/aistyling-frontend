import { ChangeEvent } from "react";

type PromptBuilderProps = {
  prompt: string;
  setPrompt: (value: string) => void;
};

export default function PromptBuilder({ prompt, setPrompt }: PromptBuilderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div>
      <label className="block mb-2 font-medium">Describe your desired style or setting</label>
      <input
        type="text"
        value={prompt}
        onChange={handleChange}
        placeholder="e.g. elegant dinner party, rainy street in Tokyo..."
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
