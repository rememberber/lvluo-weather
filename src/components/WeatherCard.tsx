import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  // Map wttr.in weather codes to weather icons
  const getWeatherIcon = (code: string) => {
    const codeNum = parseInt(code);
    if (codeNum <= 113) return '01d'; // Clear
    if (codeNum <= 116) return '02d'; // Partly cloudy
    if (codeNum <= 119) return '03d'; // Cloudy
    if (codeNum <= 122) return '04d'; // Overcast
    if (codeNum <= 299) return '09d'; // Light rain
    if (codeNum <= 399) return '10d'; // Rain
    if (codeNum <= 599) return '13d'; // Snow
    if (codeNum <= 699) return '50d'; // Mist
    if (codeNum <= 799) return '11d'; // Thunderstorm
    return '01d';
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{weather.name}</h2>
        <div className="flex items-center justify-center mt-4">
          <img
            src={`https://openweathermap.org/img/wn/${getWeatherIcon(weather.weather[0].icon)}@2x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20"
          />
          <span className="text-5xl font-bold text-gray-800">
            {Math.round(weather.main.temp)}°C
          </span>
        </div>
        <p className="text-lg text-gray-600 capitalize mt-2">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-xl">
          <Thermometer className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">体感温度</p>
            <p className="font-semibold">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 p-3 rounded-xl">
          <Droplets className="text-green-500" />
          <div>
            <p className="text-sm text-gray-600">湿度</p>
            <p className="font-semibold">{weather.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-xl">
          <Cloud className="text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">气压</p>
            <p className="font-semibold">{weather.main.pressure} hPa</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-xl">
          <Wind className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">风速</p>
            <p className="font-semibold">{Math.round(weather.wind.speed)} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}