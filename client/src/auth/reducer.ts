import { AnyAction } from "redux";
import { actionType, AuthAction } from "./action";
import { Action } from "redux";
import { User } from "../models/auth/User";

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

export const reducer = (state: AuthState = initialState, action: AuthAction & Action): AuthState => {
    switch (action.type) {
        case actionType.AUTHENTICATE: {
            const { user } = action;
            return {
                ...state,
                user,
            };
        }
        default:
            return state;
    }
}
