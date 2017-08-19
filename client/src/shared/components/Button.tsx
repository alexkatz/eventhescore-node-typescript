import * as React from 'react';
import * as Radium from 'radium';
import { Constants } from "../constants";

export const Button: React.ComponentType<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = Radium(
    ({ style, ...props }) => (
        <button
            style={{
                outline: 'none',
                border: 'none',
                backgroundColor: 'transparent',
                transition: `opacity ${Constants.TRANSITION_SECONDS}s, transform ${Constants.TRANSITION_SECONDS / 2}s`,
                ':hover': {
                    opacity: Constants.HOVER_OPACITY,
                },
                ':active': {
                    transform: 'scale(0.99)',
                },
                ...style,
            }}
            {...props}
        />
    )
);
