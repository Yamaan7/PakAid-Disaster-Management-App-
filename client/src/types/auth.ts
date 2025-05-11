export interface User {
    _id: string;
    email: string;
    role: 'admin' | 'rescue-team' | 'user';
    teamName?: string;
    isVerified?: boolean;
    createdAt?: string;
}