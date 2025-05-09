import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Swal from 'sweetalert2';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface BlogData {
    image: string;
    severity: string;
    title: string;
    date: string;
    keywords: string;
    content: string;
    donationTarget: string;
    location: string;
    id?: string;  // Make id optional but don't include it in string index signature
    [key: string]: string | undefined;  // Update index signature to allow undefined
}

interface UserBlog {
    _id: string;
    title: string;
    content: string;
    severity: string;
    location: string;
    authorName: string;
    createdAt: string;
    image: string;
}


const UserDashboard = () => {
    const { user } = useAuth();
    const [userBlogs, setUserBlogs] = useState<UserBlog[]>([]);
    const [editingBlog, setEditingBlog] = useState<UserBlog | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [blogData, setBlogData] = useState<BlogData>({
        image: '',
        severity: '',
        title: '',
        date: new Date().toISOString().split('T')[0],
        keywords: '',
        content: '',
        donationTarget: '',
        location: ''
    });

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                if (!user?.name) return;

                const response = await fetch(`http://localhost:8080/api/blogs/user/${encodeURIComponent(user.name)}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }

                const data = await response.json();

                if (data.success) {
                    setUserBlogs(data.data);
                } else {
                    console.error('Error fetching blogs:', data.error);
                }
            } catch (error) {
                console.error('Error fetching user blogs:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load your blogs. Please try again later.',
                    confirmButtonColor: '#3B82F6'
                });
            }
        };

        fetchUserBlogs();
    }, [user?.name]);

    const handleDelete = async (blogId: string) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#EF4444',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:8080/api/blogs/${blogId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setUserBlogs(prev => prev.filter(blog => blog._id !== blogId));
                    Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
                }
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to delete blog', 'error');
        }
    };

    const handleEdit = (blog: UserBlog) => {
        setEditingBlog(blog);
        setBlogData({
            id: blog._id,
            title: blog.title,
            content: blog.content,
            severity: blog.severity,
            location: blog.location,
            image: blog.image,
            date: new Date(blog.createdAt).toISOString().split('T')[0],
            keywords: '',
            donationTarget: ''
        });
        setIsEditDialogOpen(true);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const formData = new FormData();
            const imageFile = (document.getElementById('image') as HTMLInputElement)?.files?.[0];

            if (!imageFile && !editingBlog) {
                throw new Error('Please select an image');
            }

            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Append blog data
            // In the handleSubmit function, update the form data appending logic:
            Object.keys(blogData).forEach((key) => {
                if (key !== 'image' || imageFile) {
                    const value = blogData[key];
                    if (value !== undefined) {  // Add null check
                        formData.append(key, value);
                    }
                }
            });

            formData.append('authorName', userData.name);

            const url = editingBlog
                ? `http://localhost:8080/api/blogs/${editingBlog._id}`
                : 'http://localhost:8080/api/blogs';

            const method = editingBlog ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData
            });

            if (response.ok) {
                const data = await response.json();

                // Update local state
                if (editingBlog) {
                    setUserBlogs(prev => prev.map(blog =>
                        blog._id === editingBlog._id ? data.data : blog
                    ));
                    setEditingBlog(null);
                    setIsEditDialogOpen(false); // Close dialog after successful edit
                } else {
                    setUserBlogs(prev => [...prev, data.data]);
                }

                // Show success message
                await Swal.fire({
                    icon: 'success',
                    title: 'Blog Posted Successfully!',
                    text: 'Your blog has been published.',
                    confirmButtonColor: '#3B82F6'
                });

                // Reset all form fields
                setBlogData({
                    image: '',
                    severity: '',
                    title: '',
                    date: new Date().toISOString().split('T')[0],
                    keywords: '',
                    content: '',
                    donationTarget: '',
                    location: ''
                });

                // Reset file input
                const fileInput = document.getElementById('image') as HTMLInputElement;
                if (fileInput) fileInput.value = '';

                // Reset Select components by forcing them to show placeholders
                const severitySelect = document.querySelector('[id^="radix-"]') as HTMLElement;
                const locationSelect = document.querySelector('[id^="radix-"]') as HTMLElement;
                if (severitySelect) severitySelect.click();
                if (locationSelect) locationSelect.click();

                // Reset text inputs and textarea
                const titleInput = document.getElementById('title') as HTMLInputElement;
                const keywordsInput = document.getElementById('keywords') as HTMLInputElement;
                const contentInput = document.getElementById('content') as HTMLTextAreaElement;
                const donationInput = document.getElementById('donationTarget') as HTMLInputElement;

                if (titleInput) titleInput.value = '';
                if (keywordsInput) keywordsInput.value = '';
                if (contentInput) contentInput.value = '';
                if (donationInput) donationInput.value = '';
            }

        } catch (error) {
            console.error('Error creating blog:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error instanceof Error ? error.message : 'Failed to create blog post. Please try again.',
                confirmButtonColor: '#3B82F6'
            });
        }
    };

    // Add EditDialog component inside UserDashboard
    const EditDialog = () => (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto my-4">
                <DialogHeader className="sticky top-0 bg-white pb-4 z-10">
                    <DialogTitle>Edit Blog Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4"> {/* Reduced space-y-6 to space-y-4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid layout for compact form */}
                        <div>
                            <Label htmlFor="title">📝 Title</Label>
                            <Input
                                id="title"
                                value={blogData.title}
                                placeholder="Enter blog title"
                                onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="date">📅 Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={blogData.date}
                                onChange={(e) => setBlogData({ ...blogData, date: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="severity">⚠️ Severity Level</Label>
                            <Select
                                value={blogData.severity}
                                onValueChange={(value) => setBlogData({ ...blogData, severity: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="urgent">🚨 Urgent</SelectItem>
                                    <SelectItem value="ongoing">🌀 Ongoing</SelectItem>
                                    <SelectItem value="basic">ℹ️ Basic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="location">📍 Location</Label>
                            <Select
                                value={blogData.location}
                                onValueChange={(value) => setBlogData({ ...blogData, location: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[
                                        "karachi", "lahore", "islamabad", "rawalpindi", "peshawar",
                                        "quetta", "multan", "faisalabad", "hyderabad", "sialkot",
                                        "gujranwala", "bahawalpur", "sargodha", "sukkur", "larkana",
                                        "sheikhupura", "bhimber", "mirpur", "muzaffarabad", "gilgit",
                                        "skardu", "hunza", "khuzdar", "turbat", "gwadar", "abbottabad",
                                        "mansehra", "swat", "mardan", "jacobabad", "kashmore",
                                        "thatta", "rahim-yar-khan", "sahiwal", "okara"
                                    ].map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city.charAt(0).toUpperCase() + city.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="image">🖼️ Disaster Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="file:mr-4 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-sm hover:file:bg-indigo-100 transition-all duration-200"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setBlogData({ ...blogData, image: file.name });
                                }
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="keywords">🔍 Keywords</Label>
                            <Input
                                id="keywords"
                                value={blogData.keywords}
                                placeholder="e.g., balochistan, earthquake"
                                onChange={(e) => setBlogData({ ...blogData, keywords: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="donationTarget">🎯 Donation Target (PKR)</Label>
                            <Input
                                id="donationTarget"
                                type="number"
                                value={blogData.donationTarget}
                                placeholder="Enter target amount"
                                onChange={(e) => setBlogData({ ...blogData, donationTarget: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="content">✏️ Blog Content</Label>
                        <Textarea
                            id="content"
                            value={blogData.content}
                            placeholder="Write your blog content here..."
                            className="h-24"
                            onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 sticky bottom-0 bg-white">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 transition-all duration-500 shadow-lg text-white py-12 mb-8">

                <div className="container mx-auto px-4 py-12 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to Your Dashboard
                    </h1>
                    <p className="text-lg opacity-90">
                        Share your insights and help others stay informed
                    </p>
                </div>
            </div>

            {/* User Info Card */}
            <div className="container mx-auto px-4">
                <Card className="mb-8 rounded-2xl shadow-xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100">
                    <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-t-2xl">
                        <h2 className="text-2xl font-bold tracking-wide">👤 Profile Information</h2>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-lg text-gray-700 mb-2">
                            <span className="font-medium text-gray-900">Name:</span> {user?.name}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-medium text-gray-900">Email:</span> {user?.email}
                        </p>
                    </CardContent>
                </Card>


                {/* User's Blogs Section */}
                <Card className="mb-8 rounded-2xl shadow-xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-t-2xl">
                        <h2 className="text-2xl font-bold tracking-wide">📝 Your Blogs</h2>
                        <p className="text-sm text-white/90 mt-1">Manage your published blogs</p>
                    </CardHeader>
                    <CardContent className="p-6">
                        {userBlogs.length === 0 ? (
                            <p className="text-gray-500 text-center py-4 italic">You haven't published any blogs yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {userBlogs.map((blog) => (
                                    <div
                                        key={blog._id}
                                        className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-start"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">{blog.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                📍 Location: {blog.location} &nbsp;|&nbsp; ⚠️ Severity: {blog.severity}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                🗓️ Posted on: {new Date(blog.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="hover:bg-indigo-100 transition-colors"
                                                onClick={() => handleEdit(blog)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(blog._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>


                {/* Blog Creation Form */}
                <Card className="rounded-2xl shadow-xl border border-gray-200 bg-gradient-to-b from-white via-gray-50 to-gray-100 mb-12">
                    <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-6 rounded-t-2xl">
                        <h2 className="text-2xl font-bold">📣 Create a Blog Post</h2>
                        <p className="text-sm mt-1 text-white/90">Share details about a disaster needing urgent attention</p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="image">🖼️ Disaster Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="file:mr-4 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-sm hover:file:bg-indigo-100 transition-all duration-200"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setBlogData({ ...blogData, image: file.name });
                                        }
                                    }}
                                />
                            </div>


                            <div>
                                <Label htmlFor="severity">⚠️ Severity Level</Label>
                                <Select onValueChange={(value) => setBlogData({ ...blogData, severity: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select severity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="urgent">🚨 Urgent</SelectItem>
                                        <SelectItem value="ongoing">🌀 Ongoing</SelectItem>
                                        <SelectItem value="basic">ℹ️ Basic</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="location">📍 Location</Label>
                                <Select onValueChange={(value) => setBlogData({ ...blogData, location: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* You can scroll or group these later if needed */}
                                        {[
                                            "karachi", "lahore", "islamabad", "rawalpindi", "peshawar", "quetta", "multan", "faisalabad",
                                            "hyderabad", "sialkot", "gujranwala", "bahawalpur", "sargodha", "sukkur", "larkana",
                                            "sheikhupura", "bhimber", "mirpur", "muzaffarabad", "gilgit", "skardu", "hunza", "khuzdar",
                                            "turbat", "gwadar", "abbottabad", "mansehra", "swat", "mardan", "jacobabad", "kashmore",
                                            "thatta", "rahim-yar-khan", "sahiwal", "okara"
                                        ].map((city) => (
                                            <SelectItem key={city} value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="title">📝 Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter blog title"
                                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="date">📅 Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={blogData.date}
                                    onChange={(e) => setBlogData({ ...blogData, date: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="keywords">🔍 Keywords</Label>
                                <Input
                                    id="keywords"
                                    placeholder="e.g., balochistan, earthquake, emergency"
                                    onChange={(e) => setBlogData({ ...blogData, keywords: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="content">✏️ Blog Content</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Write your blog content here..."
                                    className="h-36"
                                    onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="donationTarget">🎯 Donation Target (PKR)</Label>
                                <Input
                                    id="donationTarget"
                                    type="number"
                                    placeholder="Enter target amount"
                                    onChange={(e) => setBlogData({ ...blogData, donationTarget: e.target.value })}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
                            >
                                🚀 Publish Blog
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <EditDialog />

            </div>
        </div>
    );
};

export default UserDashboard;