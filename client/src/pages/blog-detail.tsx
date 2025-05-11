import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateProgress, formatCurrency } from "@/lib/utils";
import Swal from "sweetalert2";
import PayPalButton from "@/components/PayPalButton";
import { PayPalButtons } from "@paypal/react-paypal-js";


const BlogDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

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

  const { data: rescueTeam } = useQuery({
    queryKey: ['rescueTeam', blog?.assignedTeamId],
    queryFn: async () => {
      if (!blog?.assignedTeamId) return null;
      const response = await fetch(`http://localhost:8080/api/auth/rescue-team/${blog.assignedTeamId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch rescue team');
      }
      const data = await response.json();
      return data.data;
    },
    enabled: !!blog?.assignedTeamId
  });

  // Add donation mutation
  const { mutate: updateDonation } = useMutation({
    mutationFn: async (amount: number) => {
      const response = await fetch(`http://localhost:8080/api/blogs/${id}/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      if (!response.ok) {
        throw new Error('Failed to update donation');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blog', id]
      });
    },
  });

  const handleDonationSuccess = (details: any) => {
    const amount = details.purchase_units[0].amount.value;
    updateDonation(Number(amount));
    Swal.fire({
      icon: 'success',
      title: 'Thank you for your donation!',
      text: `You have donated $${amount} to help with this disaster.`,
    });
  };

  const handleDonationError = (error: any) => {
    console.error('Payment failed:', error);
    Swal.fire({
      icon: 'error',
      title: 'Payment Failed',
      text: 'There was an error processing your donation. Please try again.',
    });
  };




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
                  <h6>Current Progress</h6>
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
                  <div className="max-w-md mx-auto">
                    <PayPalButton
                      amount="10.00" // You can make this dynamic
                      onSuccess={handleDonationSuccess}
                      onError={handleDonationError}
                    />
                  </div>
                </div>
              </div>
            )}


            {/* Rescue Team Section */}
            {blog.assignedTeamId && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Assigned Rescue Team</h2>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={`http://localhost:8080/${rescueTeam?.profilePicturePath}`}
                      alt={rescueTeam?.teamName}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {rescueTeam?.teamName}
                    </h3>
                    <div className="mt-2 space-y-2 text-sm text-gray-600">
                      <p className="flex items-center">
                        <span className="mr-2">👥</span>
                        Team Size: {rescueTeam?.teamSize} members
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">📧</span>
                        Contact: {rescueTeam?.email}
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">📱</span>
                        Phone: {rescueTeam?.phone}
                      </p>
                    </div>
                    {/* <p className="mt-3 text-gray-700">
                      {rescueTeam?.description}
                    </p> */}
                    <div className="mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <span className="mr-1.5">✓</span>
                        Actively Deployed
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        Since {new Date(rescueTeam?.deployedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
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