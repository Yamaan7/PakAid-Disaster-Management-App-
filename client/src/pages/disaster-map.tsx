import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { cityCoordinates } from "@/data/pakistan-cities";
import { Icon } from 'leaflet';

interface Blog {
  _id: string;
  title: string;
  location: string;
  severity: 'urgent' | 'ongoing' | 'past';
  image: string; // Add this line
}

const DisasterMap = () => {
  // Create custom marker icon
  const customIcon = new Icon({
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <path fill="#ef4444" d="M12 0c-4.4 0-8 3.6-8 8c0 5.4 7 14.5 7.3 14.8c0.2 0.3 0.5 0.4 0.7 0.4s0.5-0.1 0.7-0.4c0.3-0.3 7.3-9.4 7.3-14.8c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4s4 1.8 4 4s-1.8 4-4 4z"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      return data.data;
    }
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex gap-6">
        {/* Map Container */}
        <div style={{ height: "500px", width: "70%" }} className="border rounded-lg overflow-hidden">
          <MapContainer
            center={[30.3753, 69.3451]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Add Markers for each blog */}
            {blogs.map((blog) => {
              const coordinates = cityCoordinates[blog.location.toLowerCase()];
              if (!coordinates) return null;

              return (
                <Marker
                  key={blog._id}
                  position={coordinates}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <img
                        src={`http://localhost:8080/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-bold text-lg">{blog.title}</h3>
                      <p className="text-sm text-gray-600">{blog.location}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${blog.severity === 'urgent'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {blog.severity}
                      </span>
                      <Link href={`/blog/${blog._id}`}>
                        <a className="block mt-2 text-blue-500 hover:underline">View Details</a>
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Blogs Side Container */}
        <div className="w-[30%] border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Active Disasters</h2>
          </div>
          <div className="overflow-y-auto" style={{ height: "440px" }}>
            {blogs.map((blog: Blog) => (
              <Link key={blog._id} href={`/blog/${blog._id}`}>
                <a className="block p-4 border-b hover:bg-gray-50">
                  <div className="flex gap-4">
                    {/* Image container */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={`http://localhost:8080/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Content container */}
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{blog.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{blog.location}</p>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded ${blog.severity === 'urgent'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {blog.severity}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterMap;