import { AnyAction } from "redux";

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

export function reducer(state: AuthState = initialState, action: AnyAction): AuthState {
    return initialState;
}
