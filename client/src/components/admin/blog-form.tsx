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
import { RescueTeam } from "@/data/mock-data";

interface BlogFormProps {
  onSave: (formData: any) => void;
  initialData?: any;
  rescueTeams: RescueTeam[];
}

const BlogForm = ({ onSave, initialData, rescueTeams }: BlogFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    imageUrl: initialData?.imageUrl || "",
    tags: initialData?.tags?.join(", ") || "",
    disasterType: initialData?.disasterType || "flood",
    status: initialData?.status || "urgent",
    rescueTeamId: initialData?.rescueTeamId || "",
    donationTarget: initialData?.donationTarget || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.content || !formData.imageUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Process tags
    const tags = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);
    
    onSave({
      ...formData,
      tags,
      donationTarget: formData.donationTarget ? parseInt(formData.donationTarget) : 0,
    });
    
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        title: "",
        content: "",
        imageUrl: "",
        tags: "",
        disasterType: "flood",
        status: "urgent",
        rescueTeamId: "",
        donationTarget: "",
      });
    }
    
    toast({
      title: initialData ? "Blog Post Updated" : "Blog Post Created",
      description: initialData 
        ? `${formData.title} has been updated successfully` 
        : `${formData.title} has been created successfully`,
    });
  };

  return (
    <div className="bg-neutral-light rounded-lg p-4 mb-6">
      <h3 className="font-medium text-lg mb-4">
        {initialData ? "Edit Blog Post" : "Create New Blog Post"}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog post title"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="disasterType">Disaster Type</Label>
            <Select
              value={formData.disasterType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, disasterType: value }))}
            >
              <SelectTrigger id="disasterType">
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
          
          <div>
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
        </div>
        
        <div className="mb-4">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Blog post content..."
            rows={8}
            required
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
            required
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Flood, Sindh, Emergency, etc."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="rescueTeamId">Assigned Rescue Team</Label>
            <Select
              value={formData.rescueTeamId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, rescueTeamId: value }))}
            >
              <SelectTrigger id="rescueTeamId">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {rescueTeams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
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
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" variant="destructive">
            {initialData ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
