import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../store/state";

export const wrap: ((Component: any, wrappers: [(component: any) => any]) => any) = (Component, wrappers) => wrappers.reduce((C, wrapper) => wrapper(C), Component);

export type Thunk<A extends Action, R = Promise<void>> = (dispatch: (action: A | ThunkAction<Promise<void>, State, any>) => Promise<R>, getState: () => State) => R;
