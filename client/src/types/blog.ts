export interface BlogData {
    image: string;
    imageFile?: File;
    severity: string;
    title: string;
    date: string;
    keywords: string;
    content: string;
    donationTarget: string;
    location: string;
    id?: string;
    [key: string]: string | File | undefined;
}

export interface UserBlog {
    _id: string;
    title: string;
    content: string;
    severity: string;
    location: string;
    authorName: string;
    createdAt: string;
    image: string;
    keywords?: string;
    donationTarget?: number;
    assignedTeamId?: string;  // Add this field if not already present
}

export interface RescueTeam {
    _id: string;
    teamName: string;
    email: string;
    teamSize: number;
    description: string;
}