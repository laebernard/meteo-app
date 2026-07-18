import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

type Props = {
  code: number;
  size?: number;
};

export default function WeatherIcon({ code, size = 40 }: Props) {
  if (code === 0) return <WiDaySunny size={size} />; 

  if ([1, 2, 3].includes(code)) return <WiCloud size={size} />;

  if ([45, 48].includes(code)) return <WiFog size={size} />;

  if ([51, 53, 55, 56, 57].includes(code)) return <WiRain size={size} />;

  if ([61, 63, 65, 66, 67].includes(code)) return <WiRain size={size} />;

  if ([71, 73, 75, 77].includes(code)) return <WiSnow size={size} />;

  if ([80, 81, 82].includes(code)) return <WiRain size={size} />;

  if ([95, 96, 99].includes(code)) return <WiThunderstorm size={size} />;

  return <WiCloudy size={size} />;
}
