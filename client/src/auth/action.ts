import { ThunkAction } from 'redux-thunk';
import { State } from '../store/state';
import { client } from '../shared/client';
import { Action } from 'redux';
import { Thunk } from '../shared/utilities';
import { User } from '../models/auth/User';
import { AuthPayload } from '../models/auth/AuthPayload';

export enum actionType {
    AUTHENTICATE = 'auth/AUTHENTICATE',
}

export interface AuthAction extends Action {
    user?: User;
}

export const authenticate = (authPayload: AuthPayload): Thunk<AuthAction, Promise<void>> =>
    async dispatch => {
        try {
            const user: User = await client.post('/auth', authPayload);
            dispatch({ type: actionType.AUTHENTICATE, user });
        } catch (error) {
            console.log(error);
            return null;
        }
    }