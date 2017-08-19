import { Store, createStore, compose } from "redux";
import { History } from 'history';
import { State } from './state';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createRootReducer } from "./createRootReducer";
import { createMiddleware } from "./createMiddleware";
import { applyMiddleware } from "redux";
import DevTools from '../devTools/DevTools';

export function configureStore(history: History): Store<State> {
    const rootReducer = createRootReducer();
    const middleware = createMiddleware(history);

    console.log('DevTools: ', DevTools);
    const enhancer = compose(
        applyMiddleware(...middleware),
        autoRehydrate(),
        DevTools ? DevTools.instrument() : f => f,
    );

    const store = createStore<State>(
        rootReducer,
        enhancer,
    );

    persistStore(store, {
        blacklist: ['routing'],
    });

    return store;
}