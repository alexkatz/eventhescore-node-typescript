import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import createHistory from 'history/createBrowserHistory';
import { State } from './store/store';
import { App } from './app/App';

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
