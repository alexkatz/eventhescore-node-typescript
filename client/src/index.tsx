import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import createHistory from 'history/createBrowserHistory';
import { State } from './store/state';
import { App } from './app/App';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
