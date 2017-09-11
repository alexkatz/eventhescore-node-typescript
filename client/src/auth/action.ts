import { ThunkAction } from 'redux-thunk';
import { State } from '../store/state';
import { AuthData, User } from "./models";
import { client } from '../shared/client';
import { Action } from 'redux';
import { Thunk } from '../shared/utilities';

export enum actionType {
    AUTHENTICATE = 'auth/AUTHENTICATE',
}

export interface AuthAction extends Action {
    user?: User;
}

export const authenticate = (authData: AuthData): Thunk<AuthAction, Promise<void>> =>
    async dispatch => {
        try {
            const user: User = await client.post('/auth', authData);
            dispatch({ type: actionType.AUTHENTICATE, user });
        } catch (error) {
            console.log(error);
            return null;
        }
    }