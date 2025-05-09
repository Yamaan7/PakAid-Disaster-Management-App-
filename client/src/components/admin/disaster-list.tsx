import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import { Disaster } from "@/data/mock-data";

interface DisasterListProps {
  disasters: Disaster[];
  onEdit: (disaster: Disaster) => void;
  onDelete: (disasterId: string) => void;
}

const DisasterList = ({ disasters, onEdit, onDelete }: DisasterListProps) => {
  return (
    <div>
      <h3 className="font-medium text-lg mb-4">Current Disaster Markers</h3>
      
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
        <Table>
          <TableHeader className="bg-neutral-light">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disasters.map((disaster) => (
              <TableRow key={disaster.id}>
                <TableCell className="font-medium">{disaster.title}</TableCell>
                <TableCell>{disaster.type}</TableCell>
                <TableCell>{`${disaster.location.lat.toFixed(4)}, ${disaster.location.lng.toFixed(4)}`}</TableCell>
                <TableCell>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(disaster.status)}`}>
                    {disaster.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-secondary hover:text-blue-700 mr-2"
                    onClick={() => onEdit(disaster)}
                  >
                    <Edit size={16} />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-red-700"
                    onClick={() => onDelete(disaster.id)}
                  >
                    <Trash size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {disasters.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No disaster markers found. Use the form above to add one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DisasterList;
