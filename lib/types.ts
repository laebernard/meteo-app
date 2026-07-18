export type DailyForecast = {
  date: string;
  weatherCode: number;

  tempMin: number;
  tempMax: number;

  windMin: number;
  windMax: number;

  humidityMin: number;
  humidityMax: number;

  uvMax: number;

  sunrise: string;
  sunset: string;
};
