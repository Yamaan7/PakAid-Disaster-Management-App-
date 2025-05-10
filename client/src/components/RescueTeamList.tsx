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
import { UserBlog } from '@/types/blog';

interface RescueTeam {
    _id: string;
    teamName: string;
    email: string;
    teamSize: number;
    description: string;
    assignedBlogId?: string;
    assignedBlogTitle?: string;
}

// interface Blog {
//     _id: string;
//     title: string;
//     location: string;
//     severity: string;
//     assignedTeamId?: string;
// }

interface RescueTeamListProps {
    blogs: UserBlog[];
    setBlogs: React.Dispatch<React.SetStateAction<UserBlog[]>>;
}


export const RescueTeamList = ({ blogs, setBlogs }: RescueTeamListProps) => {
    const [rescueTeams, setRescueTeams] = useState<RescueTeam[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<RescueTeam | null>(null);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

    useEffect(() => {
        fetchRescueTeams();
    }, [blogs]); // Add blogs as a dependency to refetch when assignments change

    const fetchRescueTeams = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/rescue-team');

            if (!response.ok) {
                throw new Error('Failed to fetch rescue teams');
            }

            const data = await response.json();

            if (data.success) {
                // Log the data to verify assignments are present
                console.log('Fetched rescue teams:', data.data);

                setRescueTeams(data.data);
            } else {
                throw new Error(data.message || 'Failed to fetch rescue teams');
            }
        } catch (error) {
            console.error('Error fetching rescue teams:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load rescue teams. Please try again later.',
            });
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

            if (!response.ok) {
                throw new Error('Failed to assign team');
            }

            const data = await response.json();

            if (data.success) {
                // Update local state for rescue teams using the server response
                setRescueTeams(prev => prev.map(team =>
                    team._id === data.data.team._id ? data.data.team : team
                ));

                // Update local state for blogs using the server response
                setBlogs(prev => prev.map(blog =>
                    blog._id === data.data.blog._id ? data.data.blog : blog
                ));

                await Swal.fire({
                    icon: 'success',
                    title: 'Team Assigned Successfully',
                    text: `${selectedTeam?.teamName} has been assigned to the disaster.`,
                });
                setIsAssignDialogOpen(false);
            }
        } catch (error) {
            console.error('Error assigning team:', error);
            await Swal.fire({
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
                                {team.assignedBlogId && team.assignedBlogTitle && (
                                    <div className="flex items-center mt-2 text-green-600 text-sm">
                                        <svg
                                            className="w-5 h-5 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        Assigned to: {team.assignedBlogTitle}
                                    </div>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => handleAssign(team)}
                                className={`${team.assignedBlogId
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'bg-blue-50 hover:bg-blue-100'
                                    }`}
                                disabled={!!team.assignedBlogId}
                            >
                                {team.assignedBlogId ? 'Already Assigned' : 'Assign to Disaster'}
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
                        {blogs
                            .filter(blog => !blog.assignedTeamId)
                            .map((blog) => (
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
                        {blogs.filter(blog => !blog.assignedTeamId).length === 0 && (
                            <p className="text-center text-gray-500 py-4">
                                No available disasters to assign
                            </p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
};