import { getCityCoords, getWeatherByCoords } from "@/lib/weather";
import type { DailyForecast } from "@/lib/types";
import FavoriteButton from "@/components/FavoriteButton";
import WeatherIcon from "@/components/WeatherIcon";

export default async function CityPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const cityName = decodeURIComponent(name);

  const city = await getCityCoords(cityName);
  if (!city) return <p className="text-center mt-10 text-red-500">Ville introuvable.</p>;

  const weather = await getWeatherByCoords(city.latitude, city.longitude);

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-10">
      
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{city.name}</h1>
          <p className="text-gray-500 text-lg">{city.country}</p>
        </div>

        <WeatherIcon code={weather.current.weatherCode} size={70} />
      </header>

      <FavoriteButton cityName={city.name} />

      {/* CONDITIONS ACTUELLES */}
      <section className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Conditions actuelles</h2>

        <div className="grid grid-cols-2 gap-4 text-lg">
          <div className="flex flex-col">
            <span className="text-gray-500">Température</span>
            <span className="font-medium">{weather.current.temperature}°C</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Humidité</span>
            <span className="font-medium">{weather.current.humidity}%</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Vent</span>
            <span className="font-medium">{weather.current.wind} km/h</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Indice UV</span>
            <span className="font-medium">{weather.current.uv}</span>
          </div>
        </div>
      </section>

      {/* PRÉVISIONS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Prévisions</h2>

        <ul className="space-y-4">
          {weather.daily.map((day: DailyForecast) => (
            <li
              key={day.date}
              className="flex items-center gap-4 bg-white shadow-sm border border-gray-100 p-4 rounded-xl"
            >
              <WeatherIcon code={day.weatherCode} size={45} />

              <div className="flex flex-col">
                <span className="font-semibold">{day.date}</span>
                <span className="text-gray-600">
                  {day.tempMin}° / {day.tempMax}°
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
