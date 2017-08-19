import * as React from 'react';
import { FacebookLoginButton } from "./FacebookLoginButton";
import { Constants } from '../shared/constants';
import { GoogleLoginButton } from "./GoogleLoginButton";

const BUTTON_PADDING = 20;

function onAuthenticate() {

}

const Login = () => (
    <div
        style={{
            flex: 'auto',
            flexDirection: 'column',
        }}
    >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 50,
                fontSize: Constants.FontSize.XLarge,
                fontWeight: Constants.FontWeight.Light,
            }}
        >
            Even the Score
        </div>
        {
            [
                <FacebookLoginButton
                    appId={'220096918457019'}
                    style={{ boxShadow: Constants.BoxShadow.NORMAL }}
                    onAuthenticate={() => { }}
                    height={Constants.LoginButtonDimensions.HEIGHT}
                    width={Constants.LoginButtonDimensions.WIDTH}
                // disabled={isLoggingIn}
                />,
                <GoogleLoginButton
                    clientId={'672486559969-afdpgoahamkhtfb2f63p5ptrdvrqjo3q.apps.googleusercontent.com'}
                    style={{ boxShadow: Constants.BoxShadow.NORMAL }}
                    onAuthenticate={onAuthenticate}
                    height={Constants.LoginButtonDimensions.HEIGHT}
                    width={Constants.LoginButtonDimensions.WIDTH}
                // disabled={isLoggingIn}
                />
            ]
                .map((loginButton, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: BUTTON_PADDING,
                        }}
                    >
                        {loginButton}
                    </div>
                ))
        }
    </div>
);

export { Login };
