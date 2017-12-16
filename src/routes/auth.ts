import { RouteConfiguration } from 'hapi';
import { pool } from '../pool';
import * as fetch from 'isomorphic-fetch';
import * as Boom from 'boom';
import * as jwt from 'jsonwebtoken';
import { AuthPayload } from '../models/auth/AuthPayload';
import { Platform } from '../models/auth/Platform';
import { User } from '../models/auth/User';

const get = async url => {
    const response = await fetch(url);
    if (!response.ok) { return null; }
    return response.json();
};

const authenticateFacebook = async (accessToken: string): Promise<boolean> => {
    const response = await get(`https://graph.facebook.com/me?access_token=${accessToken}`);
    return response.id && response.name ? true : false;
};

const authenticateGoogle = async (accessToken: string): Promise<boolean> => {
    const result = await get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
    return result.email_verified === 'true' && parseInt(result.expires_in, 10) > 0;
};

const authenticate = async (platform: Platform, accessToken: string): Promise<boolean> => {
    return platform === Platform.Facebook
        ? await authenticateFacebook(accessToken)
        : await authenticateGoogle(accessToken);
};

const auth: RouteConfiguration[] = [
    {
        method: 'POST',
        path: '/api/auth',
        config: { auth: false },
        async handler(request, reply) {
            const client = await pool.connect();
            try {
                const { payload: authData }: { payload: AuthPayload } = request;
                const { user, user: { email, firstName, lastName, imageUrl, authPlatform }, accessToken } = authData;
                const { rows: [{ user }] } = await client.query(
                    'SELECT loginUser AS user FROM ets.loginUser($1, $2, $3, $4, $5)',
                    [email, firstName, lastName, imageUrl, authPlatform],
                ); // TODO: no magic query strings, organize stored proc calls somehow...
                const success = await authenticate(authPlatform, accessToken);
                if (!success) { throw Error(`platform ${authPlatform} could not authenticate user ${id}`); }
                reply({
                    id,
                    ...user,
                    apiToken: jwt.sign(user, process.env.SECRET_KEY),
                } as User);
            } catch (error) {
                console.log(error);
                reply(Boom.badImplementation(error));
            } finally {
                client.release();
            }
        },
    },
];

export { auth };
