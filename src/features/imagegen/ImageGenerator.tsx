import { useState, useEffect } from "react";

import PromptBuilder from "../../components/PromptBuilder";
import UserImageUploader from "../../components/UserImageUploader";
import ProductImageUploader from "../../components/ProductImageUploader";
import { generateImage } from "../../services/api";
import { formatError } from "../../shared/utils/formatError";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [autoPrompt, setAutoPrompt] = useState("");
  const [userImage, setUserImage] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productImage) {
      setAutoPrompt("Urban summer outfit with clean lines");
    }
  }, [productImage]);

  const handleGenerate = async () => {
    const userPrompt = prompt.trim() !== "" ? prompt : autoPrompt;

    if (!userPrompt) {
      setError("Prompt cannot be empty.");
      return;
    }

    const promptPrefix = `
Use the first image as the user’s body and facial reference.
Use the second image as the exact clothing item (cut, fit, color, and texture).
Ensure the output keeps the user's proportions and appearance.
Render the person wearing the exact item from the second image.
`;

    const finalPrompt = promptPrefix + "\n" + userPrompt;

    setLoading(true);
    setError(null);
    setImageUrls([]);

    try {
      const urls = await generateImage(finalPrompt, userImage ?? undefined, productImage ?? undefined);
      setImageUrls(urls);
    } catch (err: any) {
      console.error("Image generation error:", {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
        config: err?.config,
      });
      setError(
        err?.response?.data?.detail ||
        err?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PromptBuilder prompt={prompt} setPrompt={setPrompt} />
      <UserImageUploader onImageSelect={setUserImage} />
      <ProductImageUploader onImageSelect={setProductImage} />

      <button
        onClick={handleGenerate}
        className="px-6 py-3 text-white bg-black rounded-xl hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <div className="text-red-500 font-medium">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Generated result ${index + 1}`}
            className="w-full rounded-xl border"
          />
        ))}
      </div>
    </div>
  );
}
