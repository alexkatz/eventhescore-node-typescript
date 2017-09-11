import { AnyAction } from "redux";
import { User } from "./models";

export interface AuthState {
    user?: User;
    error?: string;
    isRehydrated: boolean;
}

const initialState: AuthState = {
    user: null,
    error: null,
    isRehydrated: false,
}

export const reducer = (state: AuthState = initialState, action: AnyAction): AuthState => {
    return initialState;
}
