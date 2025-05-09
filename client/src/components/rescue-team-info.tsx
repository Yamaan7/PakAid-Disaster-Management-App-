import { Users, Calendar, Activity } from "lucide-react";
import { RescueTeam } from "@/data/mock-data";

interface RescueTeamInfoProps {
  team: RescueTeam;
}

const RescueTeamInfo = ({ team }: RescueTeamInfoProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold font-heading text-neutral-dark mb-4">Rescue Team Information</h3>
      
      <div className="flex flex-col md:flex-row">
        <div className="mb-4 md:mb-0 md:mr-6">
          <img 
            src={team.imageUrl} 
            alt={team.name} 
            className="w-20 h-20 object-cover rounded-full border-4 border-neutral-light"
          />
        </div>
        <div>
          <h4 className="text-lg font-bold font-heading text-neutral-dark mb-2">{team.name}</h4>
          <p className="text-gray-600 mb-4">{team.description}</p>
          
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center bg-success bg-opacity-10 text-success text-xs font-medium px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 bg-success rounded-full mr-1"></span>
              {team.status}
            </span>
            
            <span className="inline-flex items-center bg-neutral-light text-neutral-dark text-xs font-medium px-2.5 py-0.5 rounded-full">
              <Users className="mr-1" size={12} />
              {team.memberCount}+ Members
            </span>
            
            <span className="inline-flex items-center bg-neutral-light text-neutral-dark text-xs font-medium px-2.5 py-0.5 rounded-full">
              <Calendar className="mr-1" size={12} />
              Deployed {team.deployedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescueTeamInfo;
