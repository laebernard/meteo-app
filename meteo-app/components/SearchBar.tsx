"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CityResult = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Debounce simple
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchCities(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  async function fetchCities(search: string) {
    try {
      setLoading(true);

      const url = `${process.env.NEXT_PUBLIC_GEOCODING_API}?name=${search}&count=5&language=fr`;

      const res = await fetch(url);
      const data = await res.json();

      setResults(data.results || []);
    } catch (error) {
      console.error("Erreur géocodage :", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(city: CityResult) {
    router.push(`/ville/${city.name}`);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Rechercher une ville..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm"
      />

      {loading && <p className="text-sm mt-2">Chargement...</p>}

      {results.length > 0 && (
        <ul className="mt-2 border rounded-lg bg-white shadow">
          {results.map((city) => (
            <li
              key={`${city.name}-${city.latitude}`}
              onClick={() => handleSelect(city)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {city.name} ({city.country})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
