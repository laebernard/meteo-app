"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    return <p>Aucune ville en favori pour le moment.</p>;
  }

  return (
    <ul className="border rounded-lg bg-white shadow">
      {favorites.map((city) => (
        <li
          key={city}
          onClick={() => router.push(`/ville/${city}`)}
          className="p-2 cursor-pointer hover:bg-gray-100"
        >
          {city}
        </li>
      ))}
    </ul>
  );
}
