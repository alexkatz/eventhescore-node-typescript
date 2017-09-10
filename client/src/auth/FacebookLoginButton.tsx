import * as React from 'react';
import { Constants } from "../shared/constants";
import { Colors } from "../shared/colors";
import { Assets } from "../shared/assets";
import { Button } from "../shared/components/Button";

declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
}

interface FacebookLoginButtonProps {
  appId: string;
  onAuthenticate: (props: Object) => any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: React.CSSProperties;
  width: number;
  height: number;
}

class FacebookLoginButton extends React.Component<FacebookLoginButtonProps> {
  public componentDidMount() {
    const { appId } = this.props;

    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }

    // https://developers.facebook.com/docs/javascript/quickstart
    window.fbAsyncInit = function () {
      FB.init({
        appId,
        xfbml: true,
        version: 'v2.10',
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  public render() {
    const { style, disabled, width, height } = this.props
    return (
      <Button
        style={{
          backgroundColor: Colors.FACEBOOK_BLUE,
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          opacity: disabled ? Constants.DISABLED_OPACITY : 1,
          pointerEvents: disabled ? 'none' : 'inherit',
          width,
          height,
          display: 'flex',
          ...style,
        }}
        color='secondary'
        onClick={this.onClick}
        disabled={disabled}
      >
        <img
          style={{
            marginLeft: Constants.PADDING,
            marginTop: Constants.PADDING,
            height: height - (2 * Constants.PADDING),
          }}
          src={Assets.FB_LOGO_BLUE}
        />
        <div
          style={{
            color: Colors.WHITE,
            fontFamily: 'Lucia Grande, Tahoma, Roboto, sans-serif',
            fontSize: width > 299 ? 18 : width / 21,
            height,
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Log in with Facebook
        </div>
      </Button>
    )
  }

  private onClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    const { onAuthenticate, onClick } = this.props;
    const scope = 'public_profile,email';

    if (typeof onClick === 'function') {
      onClick(e);
    }

    FB.login(response => {
      const { authResponse } = response;
      if (authResponse) {
        FB.api('/me', { fields: 'first_name,last_name,email,picture' }, me => {
          onAuthenticate({
            ...authResponse,
            firstName: me.first_name,
            lastName: me.last_name,
            email: me.email,
            platform: Constants.Platform.Facebook,
            imageUrl: me.picture.data.url,
          });
        });
      }
    }, { scope });
  }
}

export { FacebookLoginButton };
