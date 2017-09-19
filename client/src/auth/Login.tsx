import * as React from 'react';
import { FacebookLoginButton } from "./FacebookLoginButton";
import { Constants } from '../shared/constants';
import { GoogleLoginButton } from "./GoogleLoginButton";
import { authenticate } from './action';
import { connect } from 'react-redux';
import { wrap } from '../shared/utilities';
import { AuthPayload } from '../models/auth/AuthPayload';

const BUTTON_PADDING = 20;

interface LoginState {
    isLoggingIn: boolean;
}

interface LoginProps {
    authenticate: typeof authenticate;
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            isLoggingIn: false,
        }
    }

    public render() {
        const { isLoggingIn } = this.state;
        return (
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
                            onAuthenticate={this.onAuthenticate}
                            height={Constants.LoginButtonDimensions.HEIGHT}
                            width={Constants.LoginButtonDimensions.WIDTH}
                            disabled={isLoggingIn}
                        />,
                        <GoogleLoginButton
                            clientId={'672486559969-afdpgoahamkhtfb2f63p5ptrdvrqjo3q.apps.googleusercontent.com'}
                            style={{ boxShadow: Constants.BoxShadow.NORMAL }}
                            onAuthenticate={this.onAuthenticate}
                            height={Constants.LoginButtonDimensions.HEIGHT}
                            width={Constants.LoginButtonDimensions.WIDTH}
                            disabled={isLoggingIn}
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
    }

    private onAuthenticate = async (authPayload: AuthPayload) => {
        const { authenticate } = this.props;
        this.setState({ isLoggingIn: true });
        await authenticate(authPayload);
        this.setState({ isLoggingIn: false });
    }
}

const wrapped: React.ComponentType<LoginProps> = wrap(Login, [
    connect(
        null,
        {
            authenticate,
        }
    ),
]);

export { wrapped as Login };
