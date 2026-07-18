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
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature,humidity,wind_speed,weather_code,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    if (!res.ok) {
      console.error("Erreur API météo:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data.current || !data.daily) {
      return null;
    }

    return {
      current: {
        temperature: data.current.temperature,
        humidity: data.current.humidity,
        wind: data.current.wind_speed,
        weatherCode: data.current.weather_code,
        uv: data.current.uv_index,
      },
      daily: data.daily.time.map((date: string, i: number) => ({
        date,
        weatherCode: data.daily.weather_code[i],
        tempMin: data.daily.temperature_2m_min[i],
        tempMax: data.daily.temperature_2m_max[i],
      })),
    };
  } catch (error) {
    console.error("Erreur réseau météo:", error);
    return null;
  }
}
