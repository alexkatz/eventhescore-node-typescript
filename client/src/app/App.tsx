import * as React from 'react';
import { StyleRoot } from "radium";
import { Switch, Route } from "react-router";
import * as DevTools from '../devTools/DevTools';
import { LoginView } from "../auth/LoginView";
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
            <Route path='/' exact component={LoginView} />
        </Switch>
        {DevTools && <DevTools />}
    </StyleRoot>
);

export { App };
