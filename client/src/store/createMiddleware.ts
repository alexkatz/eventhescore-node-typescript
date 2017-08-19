import { Middleware } from "redux";
import { History } from 'history';
import thunk from 'redux-thunk';
import { routerMiddleware } from "react-router-redux";

export function createMiddleware(history: History): Middleware[] {
    const middleware: Middleware[] = [thunk, routerMiddleware(history)];
    if (process.env.NODE_ENV !== 'production') {
        middleware.push(require('redux-freeze'));
    }
    return middleware;
}