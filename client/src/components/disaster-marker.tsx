import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Disaster } from "@/data/mock-data";

// Custom icons
import { Droplets, Umbrella, Mountain, Sun, Thermometer, AlertTriangle } from "lucide-react";

interface DisasterMarkerProps {
  disaster: Disaster;
}

const DisasterMarker = ({ disaster }: DisasterMarkerProps) => {
  const getMarkerIcon = () => {
    const getIconColor = () => {
      switch (disaster.status) {
        case 'Urgent':
          return '#E74C3C'; // danger
        case 'Ongoing':
          return '#F39C12'; // accent
        case 'Past':
          return '#95A5A6'; // gray
        default:
          return '#3498DB'; // secondary
      }
    };

    const getIconSvg = () => {
      switch (disaster.type.toLowerCase()) {
        case 'flood':
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M2 20c6.667-6 13.333 0 20-6"/><path d="M2 10c6.667-6 13.333 0 20-6"/></svg>`;
        case 'earthquake':
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 9 2 2"/><path d="m13 2 5 5"/><path d="m9 22 9-9"/><path d="M15 13 2 21"/><path d="m22 2-5 5"/><circle cx="17" cy="17" r="2"/></svg>`;
        case 'landslide':
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`;
        case 'drought':
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>`;
        case 'heatwave':
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>`;
        default:
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
      }
    };

    const iconHtml = `
      <div style="width: 24px; height: 24px; background-color: ${getIconColor()}; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
        ${getIconSvg()}
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  return (
    <Marker
      position={[disaster.location.lat, disaster.location.lng]}
      icon={getMarkerIcon()}
    >
      <Popup>
        <div className="p-2 w-64">
          <h4 className="font-bold text-sm mb-1">{disaster.title}</h4>
          <p className="text-xs text-gray-600 mb-2">{disaster.description.substring(0, 80)}</p>
          <Button asChild variant="secondary" size="sm" className="w-full text-xs">
            <Link href={`/blog/${disaster.id}`}>View details</Link>
          </Button>
        </div>
      </Popup>
    </Marker>
  );
};

export default DisasterMarker;
