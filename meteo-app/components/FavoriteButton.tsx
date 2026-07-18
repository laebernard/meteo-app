"use client";

import { useEffect, useState } from "react";

type Props = {
  cityName: string;
};

export default function FavoriteButton({ cityName }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (!stored) return;

    const list: string[] = JSON.parse(stored);
    setIsFavorite(list.includes(cityName));
  }, [cityName]);

  function toggleFavorite() {
    const stored = localStorage.getItem("favorites");
    const list: string[] = stored ? JSON.parse(stored) : [];

    if (list.includes(cityName)) {
      // Retirer
      const updated = list.filter((c) => c !== cityName);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      // Ajouter
      list.push(cityName);
      localStorage.setItem("favorites", JSON.stringify(list));
      setIsFavorite(true);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      className="px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-100"
    >
      {isFavorite ? "⭐ Retirer des favoris" : "☆ Ajouter aux favoris"}
    </button>
  );
}
