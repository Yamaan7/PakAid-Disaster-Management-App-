import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Swal from 'sweetalert2';

interface RescueTeam {
    _id: string;
    teamName: string;
    email: string;
    teamSize: number;
    description: string;
}

interface Blog {
    _id: string;
    title: string;
    location: string;
    severity: string;
}

export const RescueTeamList = ({ blogs }: { blogs: Blog[] }) => {
    const [rescueTeams, setRescueTeams] = useState<RescueTeam[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<RescueTeam | null>(null);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

    useEffect(() => {
        fetchRescueTeams();
    }, []);

    const fetchRescueTeams = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/rescue-team');
            const data = await response.json();

            if (data.success) {
                setRescueTeams(data.data);
            }
        } catch (error) {
            console.error('Error fetching rescue teams:', error);
        }
    };

    const handleAssign = (team: RescueTeam) => {
        setSelectedTeam(team);
        setIsAssignDialogOpen(true);
    };

    const assignTeamToBlog = async (blogId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/blogs/${blogId}/assign-team`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teamId: selectedTeam?._id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Team Assigned Successfully',
                    text: `${selectedTeam?.teamName} has been assigned to the disaster.`,
                });
                setIsAssignDialogOpen(false);
            }
        } catch (error) {
            console.error('Error assigning team:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to assign team to disaster.',
            });
        }
    };

    return (
        <Card className="mb-8 rounded-2xl shadow-xl border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold tracking-wide">🚑 Rescue Teams</h2>
                <p className="text-sm text-white/90 mt-1">Manage and assign rescue teams to disasters</p>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-4">
                    {rescueTeams.map((team) => (
                        <div
                            key={team._id}
                            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-start"
                        >
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {team.teamName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    👥 Team Size: {team.teamSize} members
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    ✉️ Contact: {team.email}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => handleAssign(team)}
                                className="bg-blue-50 hover:bg-blue-100"
                            >
                                Assign to Disaster
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>

            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign {selectedTeam?.teamName} to Disaster</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                                onClick={() => assignTeamToBlog(blog._id)}
                            >
                                <h4 className="font-medium text-gray-900">{blog.title}</h4>
                                <p className="text-sm text-gray-600">
                                    📍 {blog.location} | ⚠️ {blog.severity}
                                </p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
};