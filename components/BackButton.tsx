"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-gray-600 hover:text-black transition"
    >
      <FiArrowLeft size={22} />
      <span className="text-sm font-medium">Retour</span>
    </button>
  );
}
