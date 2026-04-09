// src/pages/SeekHelp.jsx

import React, { useEffect, useRef, useState } from 'react';
import haversine from 'haversine-distance';

const dummySpecialists = [
  {
    place_id: 'dummy-1',
    name: 'Dr. Aisha Kapoor',
    vicinity: '123 Voice St, Delhi, India',
    geometry: { location: { lat: 28.7041, lng: 77.1025 } },
    rating: 4.9
  },
  {
    place_id: 'dummy-2',
    name: 'Dr. Vijay Singh',
    vicinity: '45 Harmony Ave, Ambala, India',
    geometry: { location: { lat: 30.3782, lng: 76.7767 } },
    rating: 4.7
  },
  {
    place_id: 'dummy-3',
    name: 'Dr. Meera Nair',
    vicinity: '78 Vocal Way, Gurgaon, India',
    geometry: { location: { lat: 28.4595, lng: 77.0266 } },
    rating: 4.8
  }
];

export default function SeekHelp() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [query, setQuery] = useState('Delhi, India');
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const initMap = () => {
    const initialCenter = { lat: 20.5937, lng: 78.9629 };
    const m = new window.google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: 6,
    });
    setMap(m);
    performSearch(initialCenter);
  };

  const handleSearch = () => {
    if (!map) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const loc = results[0].geometry.location;
        map.setCenter(loc);
        map.setZoom(12);
        performSearch(loc);
      } else {
        alert('Location not found');
      }
    });
  };

  const performSearch = (location) => {
    // Clear markers & list
    setSpecialists([]);

    // Add dummy entries immediately
    setSpecialists(dummySpecialists);

    // Now do a live nearbySearch if desired
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(
      { location, radius: 15000, keyword: 'voice therapist' },
      (results, status) => {
        if (status === 'OK' && results) {
          // add live results after dummies
          setSpecialists(prev => [...prev, ...results]);
          // place markers for live results
          results.forEach(place => {
            new window.google.maps.Marker({
              map,
              position: place.geometry.location,
            });
          });
        }
      }
    );

    // Place markers for dummies
    dummySpecialists.forEach(dummy => {
      new window.google.maps.Marker({
        map,
        position: dummy.geometry.location,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
      });
    });
  };

  const centerCoords = map ? map.getCenter().toJSON() : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Find Voice Specialists Near You
        </h1>
        <p className="text-gray-600 mb-6">
          Connect with certified voice specialists in your area for professional help
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Search + Map */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">
                Search Location
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter city or address"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="w-full h-96 rounded overflow-hidden">
              <div ref={mapRef} className="w-full h-full" />
            </div>
          </div>

          {/* Right: Specialists List */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Voice Specialists
            </h2>
            <p className="text-gray-600 mb-2">
              {specialists.length} specialist{specialists.length !== 1 && 's'} found
            </p>
            <div className="space-y-4 max-h-[600px] overflow-auto pr-2">
              {specialists.map(place => {
                const loc = place.geometry.location;
                const coords = loc.toJSON ? loc.toJSON() : loc;
                const distanceKm = centerCoords
                  ? (haversine(centerCoords, coords) / 1000).toFixed(1)
                  : '—';
                return (
                  <div
                    key={place.place_id}
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {place.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {place.vicinity}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        Rating: {place.rating ?? 'N/A'}/5 · {distanceKm} km away
                      </p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="self-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                    >
                      Contact
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
