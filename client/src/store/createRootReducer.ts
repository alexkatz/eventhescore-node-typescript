import { Reducer, combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import { reducer as auth } from '../auth/reducer';
import { State } from "./state";

export function createRootReducer(): Reducer<State> {
    return combineReducers<State>({
        routing,
        auth,
    });
}