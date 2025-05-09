import { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import DisasterMarker from "@/components/disaster-marker";
import { fetchDisasters, Disaster } from "@/data/mock-data";
import "leaflet/dist/leaflet.css";

const DisasterMap = () => {
  const { data: disasters = [], isLoading } = useQuery({
    queryKey: ['/api/disasters'],
    queryFn: fetchDisasters,
  });
  
  const [filters, setFilters] = useState({
    types: {
      floods: true,
      earthquakes: true,
      landslides: true,
      droughts: true,
      heatwaves: true,
    },
    status: {
      urgent: true,
      ongoing: true,
      past: false,
    },
  });
  
  const handleTypeFilterChange = (type: string) => {
    setFilters(prev => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: !prev.types[type as keyof typeof prev.types],
      },
    }));
  };
  
  const handleStatusFilterChange = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: {
        ...prev.status,
        [status]: !prev.status[status as keyof typeof prev.status],
      },
    }));
  };
  
  const filteredDisasters = disasters.filter(disaster => {
    const typeMatch = 
      (disaster.type.toLowerCase() === 'flood' && filters.types.floods) ||
      (disaster.type.toLowerCase() === 'earthquake' && filters.types.earthquakes) ||
      (disaster.type.toLowerCase() === 'landslide' && filters.types.landslides) ||
      (disaster.type.toLowerCase() === 'drought' && filters.types.droughts) ||
      (disaster.type.toLowerCase() === 'heatwave' && filters.types.heatwaves);
    
    const statusMatch = 
      (disaster.status.toLowerCase() === 'urgent' && filters.status.urgent) ||
      (disaster.status.toLowerCase() === 'ongoing' && filters.status.ongoing) ||
      (disaster.status.toLowerCase() === 'past' && filters.status.past);
    
    return typeMatch && statusMatch;
  });
  
  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <div className="pt-4">
        <h1 className="text-3xl font-bold font-heading text-neutral-dark mb-4">Disaster Map</h1>
        <p className="text-gray-600 mb-6">Interactive map showing current disaster locations across Pakistan. Click on any marker for more information.</p>
        
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/4">
                {/* Map Container */}
                <div className="relative border border-gray-300 rounded-lg overflow-hidden" style={{ height: '600px' }}>
                  {isLoading ? (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <div className="spinner"></div>
                      <p className="mt-4 text-gray-600">Loading map data...</p>
                    </div>
                  ) : (
                    <MapContainer 
                      center={[30.3753, 69.3451]} // Center of Pakistan
                      zoom={5} 
                      style={{ height: '100%', width: '100%' }}
                      zoomControl={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <ZoomControl position="bottomright" />
                      
                      {filteredDisasters.map(disaster => (
                        <DisasterMarker key={disaster.id} disaster={disaster} />
                      ))}
                    </MapContainer>
                  )}
                </div>
              </div>
              
              <div className="md:w-1/4">
                {/* Filter Controls */}
                <div className="bg-neutral-light p-4 rounded-lg mb-4">
                  <h3 className="font-heading font-semibold text-lg mb-3">Filter Disasters</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-floods" 
                        checked={filters.types.floods}
                        onCheckedChange={() => handleTypeFilterChange('floods')}
                      />
                      <Label htmlFor="filter-floods">Floods</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-earthquakes" 
                        checked={filters.types.earthquakes}
                        onCheckedChange={() => handleTypeFilterChange('earthquakes')}
                      />
                      <Label htmlFor="filter-earthquakes">Earthquakes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-landslides" 
                        checked={filters.types.landslides}
                        onCheckedChange={() => handleTypeFilterChange('landslides')}
                      />
                      <Label htmlFor="filter-landslides">Landslides</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-droughts" 
                        checked={filters.types.droughts}
                        onCheckedChange={() => handleTypeFilterChange('droughts')}
                      />
                      <Label htmlFor="filter-droughts">Droughts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-heatwaves" 
                        checked={filters.types.heatwaves}
                        onCheckedChange={() => handleTypeFilterChange('heatwaves')}
                      />
                      <Label htmlFor="filter-heatwaves">Heatwaves</Label>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-urgent" 
                          checked={filters.status.urgent}
                          onCheckedChange={() => handleStatusFilterChange('urgent')}
                        />
                        <Label htmlFor="filter-urgent" className="text-danger font-medium">Urgent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-ongoing" 
                          checked={filters.status.ongoing}
                          onCheckedChange={() => handleStatusFilterChange('ongoing')}
                        />
                        <Label htmlFor="filter-ongoing" className="text-accent font-medium">Ongoing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-past" 
                          checked={filters.status.past}
                          onCheckedChange={() => handleStatusFilterChange('past')}
                        />
                        <Label htmlFor="filter-past" className="text-gray-500">Past</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Active Disaster List */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-heading font-semibold text-lg">Active Disasters</h3>
                  </div>
                  <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                    {filteredDisasters.filter(d => d.status !== 'Past').map((disaster) => (
                      <Link key={disaster.id} href={`/blog/${disaster.id}`}>
                        <a className="block p-4 hover:bg-neutral-light transition">
                          <h4 className="font-medium text-neutral-dark mb-1">{disaster.title}</h4>
                          <p className="text-sm text-gray-600 mb-1">{disaster.location.region}</p>
                          <span className={`inline-block text-white text-xs px-2 py-0.5 rounded-full ${
                            disaster.status === 'Urgent' ? 'bg-danger' : 'bg-accent'
                          }`}>
                            {disaster.status}
                          </span>
                        </a>
                      </Link>
                    ))}
                    
                    {filteredDisasters.filter(d => d.status !== 'Past').length === 0 && (
                      <div className="p-4 text-center text-gray-500">
                        No active disasters match your filter criteria.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DisasterMap;
