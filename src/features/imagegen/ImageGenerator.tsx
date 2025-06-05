import { useState } from "react";
import { generateImage } from "../../services/api";
import { formatError } from "../../shared/utils/formatError";
import PromptBuilder from "../../components/PromptBuilder";
import UserImageUploader from "../../components/UserImageUploader";
import ProductImageUploader from "../../components/ProductImageUploader";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [autoPrompt, setAutoPrompt] = useState<string | undefined>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }

    if (!userImage || !productImage) {
      setError("Please upload both your photo and a product image.");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrls([]);

    try {
      const urls = await generateImage(prompt, userImage, productImage);
      setImageUrls(urls);
    } catch (err: any) {
      console.error("Image generation error:", err);
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-4">
        <h1 className="text-3xl font-bold text-center">AI Styling Generator</h1>

        <PromptBuilder prompt={prompt} onPromptChange={setPrompt} autoPrompt={autoPrompt} />

        <UserImageUploader onImageSelect={setUserImage} />
        <ProductImageUploader onImageSelect={setProductImage} />

        <button
          onClick={handleGenerate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {imageUrls.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Generated ${index + 1}`}
                className="rounded-xl border shadow"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
