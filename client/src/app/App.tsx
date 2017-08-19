import * as React from 'react';
import { StyleRoot } from "radium";
import { Switch, Route } from "react-router";
import * as DevTools from '../devTools/DevTools';
import { Login } from "../auth/Login";
import { AppStyle } from "./AppStyle";

const App = () => (
    <StyleRoot
        style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <AppStyle />
        <Switch>
            <Route path='/' exact component={Login} />
        </Switch>
        {DevTools && <DevTools />}
    </StyleRoot>
);

export { App };
