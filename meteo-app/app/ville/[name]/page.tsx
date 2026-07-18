import { getCityCoords, getWeatherByCoords } from "@/lib/weather";

type Props = {
  params: {
    name: string;
  };
};

export default async function CityPage({ params }: Props) {
  const cityName = decodeURIComponent(params.name);

  // 1. Géocodage
  const city = await getCityCoords(cityName);

  if (!city) {
    return <p>Ville introuvable.</p>;
  }

  // 2. Météo
  const weather = await getWeatherByCoords(city.latitude, city.longitude);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {city.name} ({city.country})
      </h1>

      {/* Conditions actuelles */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Conditions actuelles</h2>
        <div className="space-y-1">
          <p>Température : {weather.current.temperature}°C</p>
          <p>Humidité : {weather.current.humidity}%</p>
          <p>Vent : {weather.current.wind} km/h</p>
          <p>Indice UV : {weather.current.uv}</p>
        </div>
      </section>

      {/* Prévisions */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Prévisions</h2>
        <ul className="space-y-2">
          {weather.daily.map((day) => (
            <li key={day.date} className="border p-3 rounded-lg">
              <strong>{day.date}</strong> — {day.tempMin}° / {day.tempMax}°
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
