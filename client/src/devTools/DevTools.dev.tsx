import * as React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// tslint:disable-next-line:no-default-export
export = createDevTools(
    <DockMonitor
        toggleVisibilityKey={'ctrl-q'}
        changePositionKey={'ctrl-w'}
        defaultIsVisible={false}
    >
        <LogMonitor theme='tomorrow' />
    </DockMonitor>,
);
