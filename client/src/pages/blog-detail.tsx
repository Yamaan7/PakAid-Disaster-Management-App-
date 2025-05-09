import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateProgress, formatCurrency } from "@/lib/utils";

const BlogDetail = () => {
  const { id } = useParams();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/api/blogs/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      const data = await response.json();
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto pt-24 px-4 pb-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto pt-24 px-4 pb-12">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">This blog post doesn't exist or has been removed.</p>
          <Button asChild variant="ghost">
            <Link href="/home">
              <span className="flex items-center">
                <ArrowLeft className="mr-2" size={16} />
                Back to All Disasters
              </span>
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <div className="pt-4">
        <Card className="overflow-hidden">
          {/* Image Section */}
          <div className="relative">
            <img
              src={`http://localhost:8080/${blog.image}`}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                {blog.severity}
              </span>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-3xl font-bold mb-2 md:mb-0">{blog.title}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-3">📍 {blog.location}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-wrap">{blog.content}</p>
            </div>

            {/* Donation Progress Section */}
            {blog.donationTarget && (
              <div className="mt-8 mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Donation Progress</h2>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Current Progress</span>
                  <span>
                    {calculateProgress(blog.donationCurrent, blog.donationTarget)}% of{' '}
                    {formatCurrency(blog.donationTarget)}
                  </span>
                </div>
                <Progress
                  value={calculateProgress(blog.donationCurrent, blog.donationTarget)}
                  className="mb-4"
                />
                <div className="text-center mt-4">
                  <Button variant="destructive">
                    Donate Now
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-8">
          <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900">
            <Link href="/home">
              <span className="flex items-center">
                <ArrowLeft className="mr-2" size={16} />
                Back to All Disasters
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;