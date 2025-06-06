type ProductImageUploaderProps = {
  onImageSelect: (file: File | null) => void;
};

export default function ProductImageUploader({ onImageSelect }: ProductImageUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onImageSelect(file);
  };

  return (
    <div>
      <label className="block mb-2 font-medium">Upload product image (optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
}
