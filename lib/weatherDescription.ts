export function getWeatherDescription(code: number): string {
  const map: Record<number, string> = {
    0: "Ciel dégagé",
    1: "Principalement dégagé",
    2: "Partiellement nuageux",
    3: "Couvert",

    45: "Brouillard",
    48: "Brouillard givrant",

    51: "Bruine légère",
    53: "Bruine modérée",
    55: "Bruine dense",
    56: "Bruine verglaçante légère",
    57: "Bruine verglaçante dense",

    61: "Pluie faible",
    63: "Pluie modérée",
    65: "Pluie forte",
    66: "Pluie verglaçante légère",
    67: "Pluie verglaçante forte",

    71: "Chute de neige légère",
    73: "Chute de neige modérée",
    75: "Chute de neige forte",
    77: "Grains de neige",

    80: "Averses légères",
    81: "Averses modérées",
    82: "Averses fortes",

    95: "Orage",
    96: "Orage avec grêle légère",
    99: "Orage avec grêle forte",
  };

  return map[code] ?? "Conditions inconnues";
}
