import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { Assignment } from "@/data/mock-data";

interface AssignmentCardProps {
  assignment: Assignment;
  onUpdateStatus?: () => void;
}

const AssignmentCard = ({ assignment, onUpdateStatus }: AssignmentCardProps) => {
  const isCompleted = assignment.progress === 100;
  
  return (
    <Card className={`overflow-hidden border border-gray-200 ${isCompleted ? 'bg-white' : 'bg-neutral-light'}`}>
      <div className={`px-4 py-2 text-white font-medium ${isCompleted ? 'bg-gray-500' : 'bg-danger'}`}>
        <div className="flex justify-between items-center">
          <span>{isCompleted ? "Completed Assignment" : "Urgent Assignment"}</span>
          <span className="text-sm">{isCompleted ? `Completed ${assignment.completedDate}` : `Assigned ${assignment.assignedDate}`}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{assignment.disasterName}</h3>
        <p className="text-gray-600 text-sm mb-4">{assignment.description}</p>
        
        <div className="flex items-center mb-4">
          <span className="text-sm font-medium mr-2">Progress:</span>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${isCompleted ? 'bg-success' : 'bg-secondary'}`} style={{ width: `${assignment.progress}%` }}></div>
          </div>
          <span className="text-sm font-medium ml-2">{assignment.progress}%</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`p-2 rounded border border-gray-200 ${isCompleted ? 'bg-neutral-light' : 'bg-white'}`}>
            <span className="block text-sm text-gray-500">Team Size</span>
            <span className="font-medium">{assignment.teamSize} Members</span>
          </div>
          <div className={`p-2 rounded border border-gray-200 ${isCompleted ? 'bg-neutral-light' : 'bg-white'}`}>
            <span className="block text-sm text-gray-500">{isCompleted ? 'Duration' : 'Expected Duration'}</span>
            <span className="font-medium">{assignment.duration}</span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button asChild variant="ghost" className="text-secondary hover:text-blue-700 font-medium text-sm p-0">
            <Link href={`/blog/${assignment.disasterId}`}>
              View Disaster Details
            </Link>
          </Button>
          
          {isCompleted ? (
            <Button variant="outline" className="text-gray-600" disabled>
              Completed
            </Button>
          ) : (
            <Button variant="destructive" onClick={onUpdateStatus}>
              Update Status
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AssignmentCard;
