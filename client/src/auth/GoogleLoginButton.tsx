import * as React from 'react';
import { Constants } from '../shared/constants';
import { Assets } from "../shared/assets";
import { Button } from "../shared/components/Button";
import { AuthPayload } from '../models/auth/AuthPayload';

const GOOGLE_SIGN_IN_COLOR = 'rgba(0, 0, 0, 0.54)';

interface GoogleLoginButtonProps {
    onAuthenticate: (authPayload: AuthPayload) => void;
    clientId: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    style?: React.CSSProperties;
    width: number;
    height: number;
}

class GoogleLoginButton extends React.Component<GoogleLoginButtonProps> {
    public componentDidMount() {
        ((d, s, id, cb) => {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js: any = element;
            js = d.createElement(s);
            js.id = id;
            js.src = '//apis.google.com/js/client:platform.js';
            fjs.parentNode.insertBefore(js, fjs);
            js.onload = cb;
        })(document, 'script', 'google-login', () => {
            gapi.load('auth2', () => {
                if (!gapi.auth2.getAuthInstance()) {
                    gapi.auth2.init({
                        client_id: this.props.clientId,
                        cookie_policy: 'single_host_origin',
                        hosted_domain: '',
                        scope: 'profile email',
                    });
                }
            });
        });
    }

    public render() {
        const { disabled, style, width, height } = this.props;
        return (
            <Button
                style={{
                    backgroundColor: 'white',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: disabled ? 0.6 : 1,
                    pointerEvents: disabled ? 'none' : 'inherit',
                    display: 'flex',
                    width: Constants.LoginButtonDimensions.WIDTH,
                    height: Constants.LoginButtonDimensions.HEIGHT,
                    ...style,
                }}
                onClick={this.signIn}
            >
                <img
                    src={Assets.GOOGLE_LOGO}
                    style={{
                        height: height - (2 * Constants.PADDING),
                        marginLeft: Constants.PADDING,
                        marginTop: Constants.PADDING,
                    }}
                />
                <div
                    style={{
                        fontFamily: '\'Roboto\', sans-serif',
                        fontSize: width > 299 ? 18 : width / 21,
                        fontWeight: 900,
                        color: GOOGLE_SIGN_IN_COLOR,
                        height,
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        justifyContent: 'center',
                    }}
                >
                    Log in with Google
                </div>
            </Button>
        )
    }

    private signIn: React.MouseEventHandler<HTMLButtonElement> = async e => {
        const { onAuthenticate, onClick } = this.props;
        if (typeof onClick === 'function') { onClick(e); }
        const auth2 = gapi.auth2.getAuthInstance();
        try {
            const res = await auth2.signIn();
            const authResponse = res.getAuthResponse();
            const basicProfile = res.getBasicProfile();
            onAuthenticate({
                accessToken: authResponse.access_token,
                user: {
                    email: basicProfile.getEmail(),
                    firstName: basicProfile.getGivenName(),
                    lastName: basicProfile.getFamilyName(),
                    authPlatform: Constants.Platform.Google,
                    imageUrl: basicProfile.getImageUrl(),
                }
            });
        } catch (error) {
            onAuthenticate(error);
        }
    }

}

export { GoogleLoginButton };
