import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DisasterFormProps {
  onSave: (formData: any) => void;
  initialData?: any;
}

const DisasterForm = ({ onSave, initialData }: DisasterFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
    status: initialData?.status || "urgent",
    description: initialData?.description || "",
    donationTarget: initialData?.donationTarget || "",
    imageUrl: initialData?.imageUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.type || !formData.latitude || !formData.longitude || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Check for valid coordinates
    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);
    
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast({
        title: "Invalid Coordinates",
        description: "Please enter valid latitude and longitude values",
        variant: "destructive",
      });
      return;
    }
    
    onSave({
      ...formData,
      latitude: lat,
      longitude: lng,
      donationTarget: formData.donationTarget ? parseInt(formData.donationTarget) : 0,
    });
    
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        name: "",
        type: "",
        latitude: "",
        longitude: "",
        status: "urgent",
        description: "",
        donationTarget: "",
        imageUrl: "",
      });
    }
    
    toast({
      title: initialData ? "Disaster Updated" : "Disaster Added",
      description: initialData 
        ? `${formData.name} has been updated successfully` 
        : `${formData.name} has been added successfully`,
    });
  };

  return (
    <div className="bg-neutral-light rounded-lg p-4 mb-6">
      <h3 className="font-medium text-lg mb-4">
        {initialData ? "Edit Disaster Marker" : "Add Disaster Marker"}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="name">Disaster Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Flooding in Sindh Province"
            />
          </div>
          
          <div>
            <Label htmlFor="type">Disaster Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="earthquake">Earthquake</SelectItem>
                <SelectItem value="landslide">Landslide</SelectItem>
                <SelectItem value="drought">Drought</SelectItem>
                <SelectItem value="heatwave">Heatwave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g. 24.8607"
            />
          </div>
          
          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="e.g. 67.0011"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the disaster..."
            rows={3}
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="donationTarget">Donation Target (₨)</Label>
          <Input
            id="donationTarget"
            name="donationTarget"
            type="number"
            value={formData.donationTarget}
            onChange={handleChange}
            placeholder="e.g. 5000000"
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" variant="destructive">
            {initialData ? "Update Marker" : "Add Marker"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DisasterForm;
