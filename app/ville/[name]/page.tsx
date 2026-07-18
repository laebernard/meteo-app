import { getCityCoords, getWeatherByCoords } from "@/lib/weather";
import type { DailyForecast } from "@/lib/types";
import FavoriteButton from "@/components/FavoriteButton";
import WeatherIcon from "@/components/WeatherIcon";
import BackButton from "@/components/BackButton";
import { formatDate } from "@/lib/formatDate";
import { getWeatherDescription } from "@/lib/weatherDescription";

export default async function CityPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const cityName = decodeURIComponent(name);

  const city = await getCityCoords(cityName);
  if (!city) return <p className="text-center mt-10 text-red-500">Ville introuvable.</p>;

  const weather = await getWeatherByCoords(city.latitude, city.longitude);

  return (
    <main className="p-6 mx-auto space-y-10 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      
      <header className="flex items-center justify-between gap-4 md:gap-10 lg:gap-20 mb-8 px-2 md:mb-12 md:px-4 md:py-2">
        <BackButton />

        <div className="
          text-center flex-1
          md:text-left
        ">
          <h1 className="text-3xl font-bold md:text-5xl">{city.name}</h1>
          <p className="text-gray-500 text-lg md:text-xl">{city.country}</p>
        </div>

        <div className="
          p-1 rounded-lg

          md:p-3 md:rounded-xl md:bg-white md:shadow-sm md:border md:border-gray-100
        ">
          <WeatherIcon 
            code={weather.current.weatherCode} 
            size={50}
          />
        </div>
      </header>



      <FavoriteButton cityName={city.name} />

      {/* CONDITIONS ACTUELLES */}
      <section className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Conditions actuelles</h2>

        <p className="text-gray-600 text-lg md:text-xl">
          {getWeatherDescription(weather.current.weatherCode)}
        </p>

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
                <span className="font-semibold capitalize">
                  {formatDate(day.date)}
                </span>
                <span className="text-gray-600">{getWeatherDescription(day.weatherCode)}</span>
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
