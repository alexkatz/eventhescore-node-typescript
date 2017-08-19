import { Reducer, combineReducers } from "redux";
import { routerReducer, RouterState } from "react-router-redux";
import { State } from "./state";

export function createRootReducer(): Reducer<State> {
    return combineReducers<State>({
        routing: routerReducer as Reducer<RouterState>,
    });
}