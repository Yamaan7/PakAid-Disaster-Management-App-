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
import { EditBlogDialog } from '@/components/EditBlogDialog';
import { BlogData, UserBlog } from '@/types/blog';
import { RescueTeamList } from '@/components/RescueTeamList';

const AdminPanel = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<UserBlog[]>([]);
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
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/blogs');

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await response.json();

        if (data.success) {
          setBlogs(data.data);
        } else {
          console.error('Error fetching blogs:', data.error);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load blogs. Please try again later.',
          confirmButtonColor: '#3B82F6'
        });
      }
    };

    fetchAllBlogs();
  }, []); // Remove user?.name dependency

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
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to delete blog');
        }

        setBlogs((prev: UserBlog[]) => prev.filter(blog => blog._id !== blogId));
        Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Delete error:', error);
      Swal.fire('Error', error instanceof Error ? error.message : 'Failed to delete blog', 'error');
    }
  };

  const handleEdit = async (blog: UserBlog) => {
    // Set initial data for the edit form
    setEditingBlog(blog);
    setBlogData({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      severity: blog.severity,
      location: blog.location,
      image: blog.image,
      date: new Date(blog.createdAt).toISOString().split('T')[0],
      keywords: blog.keywords || '', // Add if exists in your model
      donationTarget: blog.donationTarget?.toString() || '' // Add if exists in your model
    });
    setIsEditDialogOpen(true);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const formData = new FormData();

      if (blogData.imageFile) {
        formData.append('image', blogData.imageFile);  // Use the actual File object
      } else if (!editingBlog) {
        throw new Error('Please select an image');
      }

      // Append all other fields except imageFile
      Object.keys(blogData).forEach((key) => {
        if (key !== 'imageFile' && blogData[key] !== undefined) {
          formData.append(key, blogData[key] as string);
        }
      });

      // Add author name
      formData.append('authorName', userData.name);

      const url = editingBlog
        ? `http://localhost:8080/api/blogs/${editingBlog._id}`
        : 'http://localhost:8080/api/blogs';

      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingBlog ? 'update' : 'create'} blog`);
      }

      const data = await response.json();

      // Update local state based on operation type
      if (editingBlog) {
        setBlogs((prev) =>
          prev.map((blog) =>
            blog._id === editingBlog._id ? data.data : blog
          )
        );
        setEditingBlog(null);
        setIsEditDialogOpen(false);
      } else {
        setBlogs((prev) => [data.data, ...prev]);
      }

      // Show success message
      await Swal.fire({
        icon: 'success',
        title: `Blog ${editingBlog ? 'Updated' : 'Posted'} Successfully!`,
        text: `Your blog has been ${editingBlog ? 'updated' : 'published'}.`,
        confirmButtonColor: '#3B82F6'
      });

      // Reset form
      resetForm();

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to process blog post. Please try again.',
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  // Add a helper function to reset the form
  const resetForm = () => {
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

    // Reset all form fields
    const formFields = [
      'title',
      'keywords',
      'content',
      'donationTarget'
    ];

    formFields.forEach(field => {
      const element = document.getElementById(field) as HTMLInputElement | HTMLTextAreaElement;
      if (element) element.value = '';
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Admin Banner */}
      <div className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 transition-all duration-500 shadow-lg text-white py-12 mb-8">
        <div className="container mx-auto px-4 py-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg opacity-90">
            Manage all blogs and disaster reports
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
            <h2 className="text-2xl font-bold tracking-wide">📝 All Blogs</h2>
            <p className="text-sm text-white/90 mt-1">Manage all published blogs</p>
          </CardHeader>
          <CardContent className="p-6">
            {blogs.length === 0 ? (
              <p className="text-gray-500 text-center py-4 italic">No blogs have been published yet.</p>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
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
                        👤 Author: {blog.authorName} &nbsp;|&nbsp;
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
                      setBlogData(prev => ({
                        ...prev,
                        image: file.name,
                        imageFile: file  // Save the actual file object
                      }));
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
                    <SelectItem value="past">ℹ️ Past</SelectItem>
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

        <EditBlogDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          blogData={blogData}
          onBlogDataChange={setBlogData}  // This is now correctly typed
          onSubmit={handleSubmit}
        />

        <RescueTeamList
          blogs={blogs}
          setBlogs={setBlogs}
        />

      </div>
    </div>
  );
};

export default AdminPanel;