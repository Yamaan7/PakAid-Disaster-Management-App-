import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RescueTeam } from "@/data/mock-data";

interface RescueTeamListProps {
  teams: RescueTeam[];
  onToggleStatus: (teamId: string, isActive: boolean) => void;
}

const RescueTeamList = ({ teams, onToggleStatus }: RescueTeamListProps) => {
  return (
    <div>
      <h3 className="font-medium text-lg mb-4">Rescue Teams</h3>
      
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
        <Table>
          <TableHeader className="bg-neutral-light">
            <TableRow>
              <TableHead>Team Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current Assignment</TableHead>
              <TableHead>Approve</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src={team.imageUrl} 
                        alt={team.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{team.name}</span>
                  </div>
                </TableCell>
                <TableCell>{team.memberCount}</TableCell>
                <TableCell>{team.location}</TableCell>
                <TableCell>
                  <Badge variant={team.status === 'Active in Field' ? 'default' : 'secondary'}>
                    {team.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {team.currentAssignment ? (
                    <span>{team.currentAssignment}</span>
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={team.isApproved} 
                    onCheckedChange={(checked) => onToggleStatus(team.id, checked)}
                  />
                </TableCell>
              </TableRow>
            ))}
            
            {teams.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  No rescue teams found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RescueTeamList;
