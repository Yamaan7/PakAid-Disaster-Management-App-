import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlogData } from "@/types/blog";
import { Dispatch, SetStateAction } from 'react';

interface EditBlogDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    blogData: BlogData;
    onBlogDataChange: Dispatch<SetStateAction<BlogData>>;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function EditBlogDialog({
    isOpen,
    onOpenChange,
    blogData,
    onBlogDataChange,
    onSubmit
}: EditBlogDialogProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto my-4">
                <DialogHeader className="sticky top-0 bg-white pb-4 z-10">
                    <DialogTitle>Edit Blog Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title and Date */}
                        <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                                id="edit-title"
                                value={blogData.title}
                                placeholder="Enter blog title"
                                onChange={(e) => onBlogDataChange({ ...blogData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-date">Date</Label>
                            <Input
                                id="edit-date"
                                type="date"
                                value={blogData.date}
                                onChange={(e) => onBlogDataChange({ ...blogData, date: e.target.value })}
                            />
                        </div>

                        {/* Severity and Location */}
                        <div>
                            <Label htmlFor="edit-severity">Severity Level</Label>
                            <Select
                                value={blogData.severity}
                                onValueChange={(value) => onBlogDataChange({ ...blogData, severity: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                    <SelectItem value="ongoing">Ongoing</SelectItem>
                                    <SelectItem value="basic">Basic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="edit-location">Location</Label>
                            <Select
                                value={blogData.location}
                                onValueChange={(value) => onBlogDataChange({ ...blogData, location: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[
                                        "karachi", "lahore", "islamabad", "rawalpindi", "peshawar",
                                        // ... rest of the cities
                                    ].map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city.charAt(0).toUpperCase() + city.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="edit-image">Disaster Image</Label>
                        {blogData.image && (
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-gray-500">Current: {blogData.image}</span>
                                {blogData.image.startsWith('http') || blogData.image.startsWith('/uploads') ? (
                                    <img
                                        src={blogData.image}
                                        alt="Current"
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                ) : null}
                            </div>
                        )}
                        <Input
                            id="edit-image"
                            name="image" // Add this line to match Multer's expected field name
                            type="file"
                            accept="image/*"
                            className="file:mr-4 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 file:text-sm hover:file:bg-gray-200 transition-all duration-200"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    onBlogDataChange(prev => ({
                                        ...prev,
                                        image: file.name,
                                        imageFile: file
                                    }));
                                }
                            }}
                        />
                    </div>

                    {/* Keywords and Donation Target */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="edit-keywords">Keywords</Label>
                            <Input
                                id="edit-keywords"
                                value={blogData.keywords}
                                placeholder="e.g., balochistan, earthquake"
                                onChange={(e) => onBlogDataChange({ ...blogData, keywords: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-donationTarget">Donation Target (PKR)</Label>
                            <Input
                                id="edit-donationTarget"
                                type="number"
                                value={blogData.donationTarget}
                                placeholder="Enter target amount"
                                onChange={(e) => onBlogDataChange({ ...blogData, donationTarget: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <Label htmlFor="edit-content">Blog Content</Label>
                        <Textarea
                            id="edit-content"
                            value={blogData.content}
                            placeholder="Write your blog content here..."
                            className="h-24"
                            onChange={(e) => onBlogDataChange({ ...blogData, content: e.target.value })}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2 pt-4 sticky bottom-0 bg-white">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}