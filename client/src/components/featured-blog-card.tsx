import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { calculateProgress, formatCurrency } from "@/lib/utils";
import { Disaster } from "@/data/mock-data";

interface FeaturedBlogCardProps {
  disaster: Disaster;
}

const FeaturedBlogCard = ({ disaster }: FeaturedBlogCardProps) => {
  const progress = calculateProgress(disaster.donationCurrent, disaster.donationTarget);

  return (
    <Card className="overflow-hidden mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={disaster.imageUrl}
            alt={disaster.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6">
          <div className="flex items-center mb-2">
            <span className="bg-danger text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
              {disaster.status}
            </span>
            <span className="text-gray-500 text-sm ml-2">{disaster.date}</span>
          </div>

          <h2 className="text-2xl font-bold font-heading text-neutral-dark mb-2">
            {disaster.title}
          </h2>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {disaster.description}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Donation Progress</span>
              <span>{progress}% of {formatCurrency(disaster.donationTarget)}</span>
            </div>
            <Progress value={progress} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Rescue Team: <span className="font-semibold">{disaster.rescueTeam.name}</span>
            </span>

            <Button asChild variant="destructive">
              <Link href={`/blog/${disaster.id}`}>
                Read More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedBlogCard;
