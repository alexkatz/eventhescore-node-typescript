import { User } from './User';

export interface AuthPayload {
    accessToken: string;
    user: User;
}
