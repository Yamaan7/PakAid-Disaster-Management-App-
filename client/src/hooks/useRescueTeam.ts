import { useQuery } from "@tanstack/react-query";

interface RescueTeam {
    teamName: string;
    email: string;
    phone: string;
    teamSize: number;
    description: string;
    deployedDate: string;
    profilePicturePath: string;
    assignedBlogId: string | null;
}

export function useRescueTeam(id: string) {
    return useQuery({
        queryKey: ['rescueTeam', id],
        queryFn: async (): Promise<RescueTeam> => {
            const response = await fetch(`http://localhost:8080/api/rescue-teams/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch rescue team data');
            }
            const data = await response.json();
            return data.data;
        },
    });
}