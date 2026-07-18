"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  if (favorites.length === 0) {
    return <p className="text-gray-500">Aucune ville en favori pour le moment.</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {favorites.map((city) => (
        <li
          key={city}
          onClick={() => router.push(`/ville/${encodeURIComponent(city)}`)}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer transition"
        >
          <span className="font-medium text-gray-800">{city}</span>
          <FiArrowRight className="text-blue-600" size={20} />
        </li>
      ))}
    </ul>
  );
}
