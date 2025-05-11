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
    donationCurrent?: number;
    assignedTeamId?: string;
    assignedTeam?: RescueTeam;
}

export interface RescueTeam {
    _id: string;
    teamName: string;
    email: string;
    phone: string;
    teamSize: number;
    description: string;
    deployedDate: string;
    profilePicturePath: string;
    assignedBlogId?: string;
    role: 'rescue-team';
}

export type Severity = 'urgent' | 'ongoing' | 'past';

export interface BlogResponse {
    success: boolean;
    data: UserBlog[];
    message?: string;
}

export interface RescueTeamResponse {
    success: boolean;
    data: RescueTeam;
    message?: string;
}