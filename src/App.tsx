import React, { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { CitySearch } from './components/CitySearch';
import type { WeatherData, City } from './types';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://wttr.in/${lat},${lon}?format=j1`
      );
      if (!response.ok) throw new Error('天气数据获取失败');
      const data = await response.json();
      
      // Transform wttr.in data to our WeatherData format
      const transformedData: WeatherData = {
        name: data.nearest_area[0].areaName[0].value,
        main: {
          temp: data.current_condition[0].temp_C,
          feels_like: data.current_condition[0].FeelsLikeC,
          humidity: data.current_condition[0].humidity,
          pressure: data.current_condition[0].pressure
        },
        weather: [{
          main: data.current_condition[0].weatherDesc[0].value,
          description: data.current_condition[0].weatherDesc[0].value,
          icon: data.current_condition[0].weatherCode
        }],
        wind: {
          speed: data.current_condition[0].windspeedKmph / 3.6 // Convert km/h to m/s
        }
      };
      
      setWeather(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setError('您的浏览器不支持地理位置功能');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError('无法获取您的位置');
      }
    );
  };

  const handleCitySelect = (city: City) => {
    fetchWeather(city.lat, city.lon);
  };

  useEffect(() => {
    handleLocationClick();
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2070&q=80')"
      }}
    >
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-white text-center">绿萝天气</h1>
          <button
            onClick={handleLocationClick}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            获取当前位置
          </button>
          <CitySearch onCitySelect={handleCitySelect} />
        </div>

        {loading && (
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;