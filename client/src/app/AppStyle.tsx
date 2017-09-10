import * as React from 'react';
import { Style } from 'radium';

const AppStyle = () => (
    <Style
        rules={{
            'html, body, #root': {
                height: '100%',
            },
            'body, #root': {
                position: 'relative',
            },
            body: {
                margin: 0,
                overflow: 'hidden',
            },
            '*': {
                boxSizing: 'border-box',
                fontFamily: 'Saira Semi Condensed, sans-serif',
            },
        }}
    />
);

export { AppStyle };
