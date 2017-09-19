import { Platform } from './Platform';

export interface User {
    id?: number;
    username?: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    apiToken?: string;
    authPlatform: Platform;
}
