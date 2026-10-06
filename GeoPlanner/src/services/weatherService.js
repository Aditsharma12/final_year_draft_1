const DEFAULT_WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const url = `${DEFAULT_WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,surface_pressure,wind_speed_10m&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.current) {
      const { current } = data;
      return {
        temperature: current.temperature_2m ?? 24.5,
        rainfall: current.rain ?? current.precipitation ?? 0.0,
        surfacePressure: current.surface_pressure ?? 1012,
        windSpeed: current.wind_speed_10m ?? 12.4,
        humidity: current.relative_humidity_2m ?? 65,
        weatherCode: current.weather_code ?? 0,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMock: false
      };
    }
    throw new Error('Invalid response structure');
  } catch (error) {
    const hash = Math.abs(Math.sin(latitude) * Math.cos(longitude));
    const isTropical = Math.abs(latitude) < 23.5;
    const mockTemp = isTropical ? 24 + hash * 8 : 10 + hash * 15;
    const mockRain = hash > 0.6 ? Number((hash * 10).toFixed(1)) : 0.0;

    return {
      temperature: Number(mockTemp.toFixed(1)),
      rainfall: mockRain,
      surfacePressure: Math.round(1005 + (1 - hash) * 15),
      windSpeed: Number((5 + hash * 20).toFixed(1)),
      humidity: Math.round(50 + hash * 40),
      weatherCode: mockRain > 0 ? 61 : (hash > 0.4 ? 1 : 0),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMock: true
    };
  }
};

