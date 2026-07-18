export async function getCityCoords(name: string) {
  const url = `${process.env.NEXT_PUBLIC_GEOCODING_API}?name=${name}&count=1&language=fr`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) return null;

  const city = data.results[0];

  return {
    name: city.name,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
  };
}

export async function getWeatherByCoords(lat: number, lon: number) {
  const url = `${process.env.NEXT_PUBLIC_WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    current: {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      uv: data.current.uv_index,
    },
    daily: data.daily.time.map((date: string, i: number) => ({
      date,
      tempMin: data.daily.temperature_2m_min[i],
      tempMax: data.daily.temperature_2m_max[i],
    })),
  };
}
