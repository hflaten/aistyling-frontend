import { useState } from "react";
import axios from "axios";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrls([]);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/generate`, {
        prompt,
      });

      if (!response.data.image_urls || !Array.isArray(response.data.image_urls)) {
        throw new Error("Invalid response format");
      }

      setImageUrls(response.data.image_urls);
    } catch (err: any) {
      console.error("Image generation error:", err);
      setError(err?.response?.data?.detail || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-4">
        <h1 className="text-3xl font-bold text-center">AI Styling Generator</h1>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={generateImage}
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
