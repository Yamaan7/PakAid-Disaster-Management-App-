import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Activity, Users, Calendar } from "lucide-react";
import AssignmentCard from "@/components/rescue/assignment-card";
import ResourceTable from "@/components/rescue/resource-table";
import TeamChat from "@/components/rescue/team-chat";
import { 
  fetchTeamAssignments, 
  fetchTeamResources, 
  fetchChatMessages,
  updateAssignmentProgress,
  updateResourceStatus,
  Resource
} from "@/data/mock-data";

const RescueDashboard = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("assignments");
  const [isAvailable, setIsAvailable] = useState(true);
  
  // Fetch team data (using a mock team ID "team-1")
  const { data: assignments = [], refetch: refetchAssignments } = useQuery({
    queryKey: ['/api/rescue-teams/team-1/assignments'],
    queryFn: () => fetchTeamAssignments("team-1"),
    enabled: isAuthenticated,
  });
  
  const { data: resources = [], refetch: refetchResources } = useQuery({
    queryKey: ['/api/rescue-teams/team-1/resources'],
    queryFn: () => fetchTeamResources("team-1"),
    enabled: isAuthenticated,
  });
  
  const { data: messages = [] } = useQuery({
    queryKey: ['/api/rescue-teams/team-1/messages'],
    queryFn: () => fetchChatMessages("team-1"),
    enabled: isAuthenticated,
  });
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto pt-24 px-4 pb-12 text-center">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-neutral-dark mb-4">Rescue Team Access Required</h2>
            <p className="text-gray-600 mb-6">Please log in with rescue team credentials to access your dashboard.</p>
            <Button asChild variant="secondary">
              <a href="/login">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleToggleStatus = () => {
    setIsAvailable(!isAvailable);
    toast({
      title: `Status Updated`,
      description: `Your team is now ${!isAvailable ? 'Available' : 'Not Available'} for new assignments.`,
    });
  };
  
  const handleUpdateAssignment = async (assignmentId: string) => {
    try {
      await updateAssignmentProgress(assignmentId);
      refetchAssignments();
      toast({
        title: "Progress Updated",
        description: "Assignment progress has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update assignment progress. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdateResource = async (resourceId: string) => {
    try {
      await updateResourceStatus(resourceId);
      refetchResources();
      toast({
        title: "Resource Updated",
        description: "Resource status has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update resource status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <div className="pt-4">
        <Card>
          <div className="border-b border-gray-200">
            <div className="p-4 sm:p-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold font-heading text-neutral-dark">Rescue Team Dashboard</h1>
                <p className="text-gray-600">Sindh Emergency Response</p>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <Badge 
                    variant={isAvailable ? "default" : "secondary"}
                    className={`flex items-center ${isAvailable ? 'bg-success' : 'bg-gray-500'}`}
                  >
                    <span className={`w-2 h-2 ${isAvailable ? 'bg-white' : 'bg-gray-300'} rounded-full mr-1`}></span>
                    {isAvailable ? 'Available' : 'Not Available'}
                  </Badge>
                </div>
                <div className="w-10 h-10 rounded-full bg-neutral-light flex items-center justify-center text-neutral-dark">
                  <Users size={20} />
                </div>
              </div>
            </div>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-4 sm:px-6 py-2 bg-neutral-light">
                <TabsList className="grid grid-cols-5 h-auto bg-transparent">
                  <TabsTrigger value="assignments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Current Assignments
                  </TabsTrigger>
                  <TabsTrigger value="community" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Community
                  </TabsTrigger>
                  <TabsTrigger value="available" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Available Disasters
                  </TabsTrigger>
                  <TabsTrigger value="members" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Team Members
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Resources
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          <CardContent className="p-4 sm:p-6">
            <TabsContent value="assignments" className="mt-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-xl font-bold font-heading text-neutral-dark mb-2 md:mb-0">Current Assignments</h2>
                <div>
                  <span className="text-sm text-gray-600 mr-2">Team Status:</span>
                  <Button 
                    onClick={handleToggleStatus}
                    variant={isAvailable ? "default" : "secondary"}
                    className={`${isAvailable ? 'bg-success hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} py-1 px-4 rounded-full text-sm h-auto`}
                  >
                    {isAvailable ? 'Available' : 'Not Available'}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {assignments.map((assignment) => (
                  <AssignmentCard 
                    key={assignment.id}
                    assignment={assignment}
                    onUpdateStatus={() => handleUpdateAssignment(assignment.id)}
                  />
                ))}
                
                {assignments.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Activity size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No Active Assignments</h3>
                    <p className="text-gray-500 mb-4">Your team currently has no active assignments.</p>
                    <Button 
                      variant="secondary"
                      onClick={() => setActiveTab("available")}
                    >
                      Browse Available Disasters
                    </Button>
                  </div>
                )}
              </div>
              
              {assignments.length > 0 && (
                <ResourceTable 
                  resources={resources}
                  onUpdateResource={handleUpdateResource}
                />
              )}
            </TabsContent>
            
            <TabsContent value="community" className="mt-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-xl font-bold font-heading text-neutral-dark mb-2 md:mb-0">Team Communication</h2>
              </div>
              
              <TeamChat teamId="team-1" initialMessages={messages} />
            </TabsContent>
            
            <TabsContent value="available" className="mt-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-xl font-bold font-heading text-neutral-dark mb-2 md:mb-0">Available Disasters</h2>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-neutral-dark">Flooding in Sindh Province</h3>
                    <p className="text-sm text-gray-600 mt-1">Multiple districts affected by severe flooding</p>
                    <div className="flex items-center mt-2">
                      <Badge variant="destructive" className="mr-2">Urgent</Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="mr-1" size={12} />
                        Posted Sep 15, 2023
                      </span>
                    </div>
                  </div>
                  <Button disabled={!isAvailable}>
                    Accept Assignment
                  </Button>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-neutral-dark">Earthquake in Balochistan</h3>
                    <p className="text-sm text-gray-600 mt-1">6.4 magnitude earthquake affecting remote villages</p>
                    <div className="flex items-center mt-2">
                      <Badge variant="destructive" className="mr-2">Urgent</Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="mr-1" size={12} />
                        Posted Sep 10, 2023
                      </span>
                    </div>
                  </div>
                  <Button disabled={!isAvailable}>
                    Accept Assignment
                  </Button>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-neutral-dark">Landslide in Northern Areas</h3>
                    <p className="text-sm text-gray-600 mt-1">Villages isolated due to landslides in Gilgit-Baltistan</p>
                    <div className="flex items-center mt-2">
                      <Badge variant="warning" className="mr-2 bg-accent">Ongoing</Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="mr-1" size={12} />
                        Posted Aug 28, 2023
                      </span>
                    </div>
                  </div>
                  <Button disabled={!isAvailable}>
                    Accept Assignment
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="members" className="mt-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-xl font-bold font-heading text-neutral-dark mb-2 md:mb-0">Team Members</h2>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-neutral-light flex items-center justify-center text-neutral-dark mr-3">
                        <Users size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium">Team Member {index}</h4>
                        <p className="text-sm text-gray-500">{["Medic", "Rescuer", "Coordinator", "Driver", "Engineer", "Volunteer"][index % 6]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-xl font-bold font-heading text-neutral-dark mb-2 md:mb-0">Resource Management</h2>
                <Button variant="secondary">
                  Request Resources
                </Button>
              </div>
              
              <ResourceTable 
                resources={resources}
                onUpdateResource={handleUpdateResource}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RescueDashboard;
