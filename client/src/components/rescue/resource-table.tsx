import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Resource } from "@/data/mock-data";

interface ResourceTableProps {
  resources: Resource[];
  onUpdateResource: (resourceId: string) => void;
}

const ResourceTable = ({ resources, onUpdateResource }: ResourceTableProps) => {
  return (
    <div>
      <h3 className="font-medium text-lg mb-4">Resources Deployed</h3>
      
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
        <Table>
          <TableHeader className="bg-neutral-light">
            <TableRow>
              <TableHead>Resource Type</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.type}</TableCell>
                <TableCell>{resource.assignedTo}</TableCell>
                <TableCell>{resource.quantity}</TableCell>
                <TableCell>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${resource.status === 'Deployed' ? 'bg-success text-white' : 'bg-accent text-white'}`}>
                    {resource.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    className="text-secondary hover:text-blue-700 p-0 h-auto"
                    onClick={() => onUpdateResource(resource.id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {resources.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No resources deployed yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResourceTable;
