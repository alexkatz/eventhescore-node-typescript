export interface User {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    apiToken?: string;
    authPlatform: string;
}

export interface AuthData {
    accessToken: string;
    user: User;
}
