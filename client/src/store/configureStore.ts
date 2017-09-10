import { Store, createStore, compose, applyMiddleware, GenericStoreEnhancer } from "redux";
import { History } from 'history';
import { State } from './state';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createRootReducer } from "./createRootReducer";
import { createMiddleware } from "./createMiddleware";
import * as DevTools from '../devTools/DevTools';
import { StoreEnhancer } from "redux";

export function configureStore(history: History): Store<State> {
    const rootReducer = createRootReducer();
    const middleware = createMiddleware(history);

    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(...middleware),
            autoRehydrate(),
            DevTools ? DevTools.instrument() : f => f,
        ) as GenericStoreEnhancer,
    );

    persistStore(store, {
        blacklist: ['routing'],
    });

    return store;
}