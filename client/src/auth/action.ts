import { ThunkAction } from 'redux-thunk';
import { State } from '../store/state';
import { AuthData } from "./models";
import { client } from '../shared/client';

export enum actionType {
    AUTHENTICATE = 'auth/AUTHENTICATE',
    AUTHENTICATE_FAILURE = 'auth/AUTHENTICATE_FAILURE',
    AUTHENTICATE_SUCCESS = 'auth/AUTHENTICATE_SUCCESS',
}

export interface AuthAction {

}

export const authenticate = (authData: AuthData): ThunkAction<Promise<void>, State, void> =>
    async dispatch => {
        try {
            const response = await client.post('/auth', authData);
        } catch (error) {
            console.log(error);
        }
    }