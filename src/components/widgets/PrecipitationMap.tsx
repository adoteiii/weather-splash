import React, { useEffect, useRef, useState } from 'react';

/// <reference types="@types/google.maps" />

interface PrecipitationMapProps {
  lat: number;
  lon: number;
}

const loadGoogleMapsScript = (url: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error for ${url}`));
    document.head.appendChild(script);
  });
};

const PrecipitationMap: React.FC<PrecipitationMapProps> = ({ lat, lon }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.google) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat, lng: lon },
          zoom: 8,
          disableDefaultUI: true,
        });

        const precipitationLayer = new google.maps.ImageMapType({
          getTileUrl: (coord: google.maps.Point, zoom: number) => {
            return `https://tile.openweathermap.org/map/precipitation_new/${zoom}/${coord.x}/${coord.y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`;
          },
          tileSize: new google.maps.Size(256, 256),
          opacity: 1.0,
        });

        newMap.overlayMapTypes.insertAt(0, precipitationLayer);
        setMap(newMap);
        setLoading(false);
      }
    };

    loadGoogleMapsScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
      .then(initMap)
      .catch((error) => {
        console.error('Error loading Google Maps script', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (map) {
      map.setCenter({ lat, lng: lon });
    }
  }, [lat, lon, map]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="loader"></div>
          <p>Loading map...</p>
        </div>
      )}
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default PrecipitationMap;
