import axios from "axios";

export async function generateImage(
  prompt: string,
  userImage?: File,
  productImage?: File
): Promise<string[]> {
  const formData = new FormData();
  formData.append("prompt", prompt);

  if (!userImage || !productImage) {
    throw new Error("Both userImage and productImage are required.");
  }

  formData.append("image", userImage);
  formData.append("context_image", productImage);

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/generate`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (!response.data.image_urls || !Array.isArray(response.data.image_urls)) {
    throw new Error("Invalid response format");
  }

  return response.data.image_urls;
}
