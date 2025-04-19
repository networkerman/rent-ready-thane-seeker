
import React, { useEffect, useRef, useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const InteractiveMap: React.FC = () => {
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    if (mapApiKey && !mapApiLoaded) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap&v=weekly`;
      script.defer = true;
      script.async = true;
      
      // Define the callback function
      window.initMap = () => {
        setMapApiLoaded(true);
      };
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
        delete window.initMap;
      };
    }
    
    // Initialize map once API is loaded
    if (mapApiLoaded && mapRef.current) {
      const netcoreLocation = { lat: 19.1982, lng: 72.9617 }; // Netcore office in Thane
      
      const mapOptions: google.maps.MapOptions = {
        center: netcoreLocation,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };
      
      const map = new google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;
      
      // Add marker for Netcore office
      new google.maps.Marker({
        position: netcoreLocation,
        map: map,
        title: "Netcore Cloud Office",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#1E3A8A",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
        },
      });
      
      // Define areas of interest as polygons
      const areas = [
        {
          name: "Vartak Nagar",
          coords: [
            { lat: 19.2014, lng: 72.9535 },
            { lat: 19.2068, lng: 72.9667 },
            { lat: 19.1957, lng: 72.9724 },
            { lat: 19.1904, lng: 72.9587 },
          ],
          color: "#3B82F6"
        },
        {
          name: "Thane West",
          coords: [
            { lat: 19.2124, lng: 72.9614 },
            { lat: 19.2215, lng: 72.9762 },
            { lat: 19.2077, lng: 72.9893 },
            { lat: 19.1985, lng: 72.9747 },
          ],
          color: "#0D9488"
        },
        {
          name: "Mulund",
          coords: [
            { lat: 19.1675, lng: 72.9370 },
            { lat: 19.1798, lng: 72.9479 },
            { lat: 19.1724, lng: 72.9624 },
            { lat: 19.1605, lng: 72.9515 },
          ],
          color: "#8B5CF6"
        }
      ];
      
      // Create and add polygons for areas
      areas.forEach(area => {
        const polygon = new google.maps.Polygon({
          paths: area.coords,
          strokeColor: area.color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: area.color,
          fillOpacity: 0.35,
        });
        
        polygon.setMap(map);
        
        // Add center point markers for areas
        const bounds = new google.maps.LatLngBounds();
        area.coords.forEach(coord => bounds.extend(coord));
        const center = bounds.getCenter();
        
        const marker = new google.maps.Marker({
          position: center,
          map: map,
          title: area.name,
          label: {
            text: area.name,
            color: "#FFFFFF",
            fontWeight: "bold",
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 0,
          },
        });
        
        // Add hover listener for polygon highlighting
        google.maps.event.addListener(polygon, 'mouseover', function() {
          polygon.setOptions({
            fillOpacity: 0.6,
            strokeWeight: 3,
          });
        });
        
        google.maps.event.addListener(polygon, 'mouseout', function() {
          polygon.setOptions({
            fillOpacity: 0.35,
            strokeWeight: 2,
          });
        });
      });
    }
  }, [mapApiLoaded, mapApiKey]);

  const handleKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const key = formData.get('apiKey') as string;
    setMapApiKey(key);
    setShowInput(false);
  };

  return (
    <section className="section bg-white" id="map">
      <div className="container-custom">
        <AnimatedSection delay={200}>
          <h2 className="section-heading">Interactive Map</h2>
          <p className="text-gray-600 mb-6">
            Explore the preferred neighborhoods in Thane. Hover over the shaded regions to see more details.
          </p>
          
          {showInput ? (
            <div className="mb-8 p-6 border border-dashed border-gray-300 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Enter Google Maps API Key</h3>
              <form onSubmit={handleKeySubmit} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  name="apiKey"
                  placeholder="Paste your Google Maps API key here" 
                  className="form-input flex-grow"
                  required
                />
                <Button type="submit" className="btn-primary whitespace-nowrap">
                  Load Map
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-3">
                To get a Google Maps API key, visit the <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-rental-blue underline">Google Cloud Platform Console</a>
              </p>
            </div>
          ) : null}
          
          <div 
            className={`map-container relative h-[500px] ${!mapApiLoaded || !mapApiKey ? 'bg-gray-100 flex items-center justify-center' : ''}`}
          >
            {!mapApiLoaded && !showInput ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-rental-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading map...</p>
                </div>
              </div>
            ) : null}
            
            <div 
              ref={mapRef} 
              className="w-full h-full"
              style={{ display: mapApiLoaded ? 'block' : 'none' }}
            ></div>
            
            {!mapApiKey && !showInput ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <Button onClick={() => setShowInput(true)} className="btn-primary">
                  <MapPin size={20} />
                  Enter API Key
                </Button>
              </div>
            ) : null}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Areas highlighted: Vartak Nagar, Thane West, and Mulund
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

declare global {
  interface Window {
    initMap: () => void;
  }
}

export default InteractiveMap;
