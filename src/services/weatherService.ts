import { WeatherInfo } from '../types';
import { fallbackWeather } from '../data/mockNews';

// Coordenadas das principais cidades de Goiás
const GOIAS_CITIES = [
  { city: 'Rio Verde', lat: -17.7922, lon: -50.9192 },
  { city: 'Goiânia', lat: -16.6869, lon: -49.2648 },
  { city: 'Jataí', lat: -17.8814, lon: -51.7144 },
];

function interpretWeatherCode(code: number): string {
  if (code === 0) return 'Céu Limpo';
  if (code === 1 || code === 2) return 'Ensolarado c/ Nuvens';
  if (code === 3) return 'Nublado';
  if (code >= 45 && code <= 48) return 'Nevoeiro';
  if (code >= 51 && code <= 67) return 'Chuva Leve';
  if (code >= 71 && code <= 77) return 'Pancadas';
  if (code >= 80 && code <= 82) return 'Chuva';
  if (code >= 95) return 'Trovoadas';
  return 'Tempo Firme';
}

export async function fetchLiveWeather(): Promise<WeatherInfo[]> {
  try {
    const promises = GOIAS_CITIES.map(async (c) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Falha na resposta meteorológica');
      const data = await res.json();

      const temp = Math.round(data.current?.temperature_2m ?? 28);
      const condition = interpretWeatherCode(data.current?.weather_code ?? 0);
      const max = Math.round(data.daily?.temperature_2m_max?.[0] ?? temp + 3);
      const min = Math.round(data.daily?.temperature_2m_min?.[0] ?? temp - 6);
      const humidity = `${Math.round(data.current?.relative_humidity_2m ?? 50)}%`;

      return {
        city: c.city,
        temp: `${temp}°C`,
        condition,
        max: `${max}°C`,
        min: `${min}°C`,
        humidity,
      };
    });

    const results = await Promise.all(promises);
    return results;
  } catch (err) {
    console.warn('Usando previsão do tempo em cache/fallback:', err);
    return fallbackWeather;
  }
}
