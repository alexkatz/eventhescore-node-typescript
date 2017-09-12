import { RouteConfiguration } from 'hapi';
import { AuthData, User } from '../../client/src/auth/models';
import { pool } from '../pool';
import * as fetch from 'isomorphic-fetch';
import * as Boom from 'boom';

const get = async url => {
    const response = await fetch(url);
    if (!response.ok) { return null; }
    return response.json();
};

const authenticateFacebook = async ({ accessToken, user }) => {
    const response = await get(`https://graph.facebook.com/me?access_token=${accessToken}`);
    return response.id && response.name && user;
};

const authenticateGoogle = async ({ accessToken, user }) => {
    const result = await get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
    return result.email_verified === 'true' && parseInt(result.expires_in, 10) > 0 ? user : null;
};

const authenticatePayload = async payload => {
    const { user: { authPlatform } } = payload;
    return authPlatform === 'facebook'
        ? await authenticateFacebook(payload)
        : await authenticateGoogle(payload);
};

const auth: RouteConfiguration[] = [
    {
        method: 'POST',
        path: '/api/auth',
        config: { auth: false },
        async handler(request, reply) {
            const client = await pool.connect();
            try {
                const { payload: authData }: { payload: AuthData } = request;
                const { user: { email, firstName, lastName, imageUrl, authPlatform } } = authData;
                const { rows: [{ id }] } = await client.query(
                    'SELECT loginUser AS id FROM loginUser($1, $2, $3, $4, $5)',
                    [email, firstName, lastName, imageUrl, authPlatform],
                ); // TODO: no magic query strings, organize stored proc calls somehow...
                const user = await authenticatePayload(authData);
                const response: User = {
                    id,
                    ...user,
                };
                reply(response);
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
