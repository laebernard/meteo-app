import type { DailyForecast } from "./types";

export async function getCityCoords(name: string) {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=fr`
    );

    if (!res.ok) {
      console.error("Erreur API geocoding:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    return data.results[0];
  } catch (error) {
    console.error("Erreur réseau geocoding:", error);
    return null;
  }
}

export async function getWeatherByCoords(lat: number, lon: number) {
  try {
    const url = `${process.env.NEXT_PUBLIC_WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,uv_index,apparent_temperature,surface_pressure,visibility,dew_point_2m,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_speed_10m_min,uv_index_max,uv_index_clear_sky_max,relative_humidity_2m_max,relative_humidity_2m_min,sunrise,sunset&timezone=auto`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error("Erreur API météo:", res.status);
      return null;
    }

    const data = await res.json();

    return {
      current: {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        uv: data.current.uv_index,
        feelsLike: data.current.apparent_temperature,
        pressure: data.current.surface_pressure,
        visibility: data.current.visibility,
        dewPoint: data.current.dew_point_2m,
        cloudCover: data.current.cloud_cover,
      },
      daily: data.daily.time.map((date: string, i: number) => ({
        date,
        weatherCode: data.daily.weather_code[i],
        tempMin: data.daily.temperature_2m_min[i],
        tempMax: data.daily.temperature_2m_max[i],
        windMin: data.daily.wind_speed_10m_min[i],
        windMax: data.daily.wind_speed_10m_max[i],
        humidityMin: data.daily.relative_humidity_2m_min[i],
        humidityMax: data.daily.relative_humidity_2m_max[i],
        uvMax: data.daily.uv_index_max[i],
        sunrise: data.daily.sunrise[i],
        sunset: data.daily.sunset[i],
      }))


    };
  } catch (error) {
    console.error("Erreur réseau météo:", error);
    return null;
  }
}
