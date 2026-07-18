import { getCityCoords, getWeatherByCoords } from "@/lib/weather";
import type { DailyForecast } from "@/lib/types";
import FavoriteButton from "@/components/FavoriteButton";
import WeatherIcon from "@/components/WeatherIcon";

export default async function CityPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  const cityName = decodeURIComponent(name);

  const city = await getCityCoords(cityName);

  if (!city) {
    return <p>Ville introuvable.</p>;
  }

  const weather = await getWeatherByCoords(city.latitude, city.longitude);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {city.name} ({city.country})
      </h1>

      <WeatherIcon code={weather.current.weatherCode} size={60} />

      <FavoriteButton cityName={city.name} />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Conditions actuelles</h2>
        <p>Température : {weather.current.temperature}°C</p>
        <p>Humidité : {weather.current.humidity}%</p>
        <p>Vent : {weather.current.wind} km/h</p>
        <p>Indice UV : {weather.current.uv}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Prévisions</h2>
        <ul>
          {weather.daily.map((day: DailyForecast) => (
            <li key={day.date} className="border p-3 rounded-lg flex items-center gap-3">
                <WeatherIcon code={day.weatherCode} size={40} />
                <div>
                <strong>{day.date}</strong> — {day.tempMin}° / {day.tempMax}°
                </div>
            </li>
           ))}

        </ul>
      </section>
    </main>
  );
}
