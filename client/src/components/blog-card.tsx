import { Link } from "wouter";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatDate, formatCurrency, calculateProgress, truncateText } from "@/lib/utils";
import { Disaster } from "@/data/mock-data";

interface BlogCardProps {
  disaster: Disaster;
}

const BlogCard = ({ disaster }: BlogCardProps) => {
  const progress = calculateProgress(disaster.donationCurrent, disaster.donationTarget);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={disaster.imageUrl}
          alt={disaster.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase ${disaster.status === 'Urgent' ? 'bg-danger' : disaster.status === 'Ongoing' ? 'bg-accent' : 'bg-gray-500'} text-white`}>
            {disaster.status}
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="text-xl font-bold font-heading text-neutral-dark mb-2">
          {disaster.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateText(disaster.description, 150)}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Donation Progress</span>
            <span>{progress}% of {formatCurrency(disaster.donationTarget)}</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            <Calendar className="mr-1" size={14} />
            {formatDate(disaster.date)}
          </span>

          <Button asChild variant="ghost" className="text-secondary hover:text-blue-700 font-medium text-sm p-0">
            <Link href={`/blog/${disaster.id}`}>
              Read More →
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
