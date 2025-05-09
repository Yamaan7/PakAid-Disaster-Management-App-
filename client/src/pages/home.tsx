import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { calculateProgress, formatCurrency } from "@/lib/utils";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  severity: string;
  location: string;
  createdAt: string;
  donationTarget: number;
  donationCurrent: number;
}

const Home = () => {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto pt-24 px-4 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Latest Disasters</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogs.map((blog: Blog) => (
          <Card key={blog._id} className="overflow-hidden flex flex-col">
            {/* Image Container */}
            <div className="relative h-48">
              <img
                src={`http://localhost:8080/${blog.image}`}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                  {blog.severity}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-lg line-clamp-2">{blog.title}</h2>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="mr-3">📍 {blog.location}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Progress Bar */}
              {blog.donationTarget && (
                <div className="mt-auto">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Donation Progress</span>
                    <span>
                      {calculateProgress(blog.donationCurrent, blog.donationTarget)}% of{' '}
                      {formatCurrency(blog.donationTarget)}
                    </span>
                  </div>
                  <Progress
                    value={calculateProgress(blog.donationCurrent, blog.donationTarget)}
                    className="mb-4"
                  />
                </div>
              )}

              <Button asChild variant="destructive" className="w-full mt-4">
                <Link href={`/blog/${blog._id}`}>  {/* Change 'to' to 'href' */}
                  Show More Details
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No disasters found.</p>
        </div>
      )}
    </div>
  );
};

export default Home;