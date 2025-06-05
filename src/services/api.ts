import axios from "axios";

export async function generateImage(
  prompt: string,
  userImage?: File,
  productImage?: File
): Promise<string[]> {
  const formData = new FormData();
  formData.append("prompt", prompt);

  if (userImage) {
    formData.append("user_image", userImage);  // må hete nøyaktig dette
  }

  if (productImage) {
    formData.append("product_image", productImage);  // må hete nøyaktig dette
  }


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
