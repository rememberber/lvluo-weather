import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { City } from '../types';

const CITIES: City[] = [
  { name: "北京", lat: 39.9042, lon: 116.4074 },
  { name: "上海", lat: 31.2304, lon: 121.4737 },
  { name: "广州", lat: 23.1291, lon: 113.2644 },
  { name: "深圳", lat: 22.5431, lon: 114.0579 },
  { name: "成都", lat: 30.5728, lon: 104.0668 }
];

interface CitySearchProps {
  onCitySelect: (city: City) => void;
}

export function CitySearch({ onCitySelect }: CitySearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCities = CITIES.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="搜索城市..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {filteredCities.map((city) => (
            <button
              key={city.name}
              onClick={() => {
                onCitySelect(city);
                setIsOpen(false);
                setSearch("");
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
            >
              {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}