import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const ACCESS_TOKEN = import.meta.env.VITE_MAP_ACCESS_TOKEN;

// View Handler to center the map on the venue
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15); // Closer zoom for specific venue
    }
  }, [center, map]);
  return null;
}

function VenueMap({ eventCoords, venueName, venueAddress }) {
  // Default to Lagos coords if no coords provided
  const position = eventCoords || [6.5244, 3.3792];

  const markerRef = useRef(null);

  // Custom Marker to match your Cyan/Dark theme
  const venueIcon = L.divIcon({
    className: "custom-venue-marker",
    html: `<div class="w-8 h-8 bg-[#004d4d] border-4 border-cyan-400 rounded-full shadow-lg flex items-center justify-center">
             <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <div className="w-full h-full min-h-[300px] z-0">
      <MapContainer
        center={position}
        zoom={15}
        zoomControl={false} // Cleaner look for event pages
        className="h-full w-full rounded-[2rem] overflow-hidden shadow-inner"
      >
        <ChangeView center={position} />

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`}
          tileSize={512}
          zoomOffset={-1}
          attribution="&copy; Mapbox"
        />

        <Marker
          position={position}
          icon={venueIcon}
          ref={markerRef}
          eventHandlers={{
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            },
          }}
        >
          <Popup>
            <div className="p-1">
              <h4 className="font-bold text-[#004d4d]">{venueName}</h4>
              <p className="text-xs text-gray-500">{venueAddress}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default VenueMap;
