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
    if (productImage && prompt.trim() === "") {
      setAutoPrompt("A photorealistic image of the user wearing the clothing item in a realistic setting");
    }
  }, [productImage, prompt]);

  const handleGenerate = async () => {
    const userPrompt = prompt.trim() !== "" ? prompt : autoPrompt;

    if (!userPrompt) {
      setError("Prompt cannot be empty.");
      return;
    }

    const promptPrefix = `
Use the first image as the visual reference for the user's face, skin tone, body shape, and pose.
Use the second image as the exact clothing item, preserving cut, fabric, texture, color, logo, and brand details.
Do not modify or reinterpret the user's appearance or the clothing item.
Render a realistic photo of the person from image 1 wearing the clothing from image 2.
Place them in the following context or style:
`;

    const finalPrompt = `${promptPrefix}${userPrompt}`;

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
