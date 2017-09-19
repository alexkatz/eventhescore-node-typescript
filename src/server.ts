import * as Hapi from 'hapi';
import { api } from './api';
import * as inert from 'inert';
import * as auth from 'hapi-auth-jwt2';

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost', routes: { cors: true } });
server.register([
    inert as any,
    api,
    auth,
], error => {
    if (error) { throw error; }
    server.auth.strategy('jwt', 'jwt', {
        key: 'notreal',
        validateFunc: (decoded, request, callback) => {
            debugger;
            return callback(null, true);
        },
        verifyOptions: { algorithms: ['HS256'] },
    } as auth.Options);
    server.auth.default('jwt');
    server.start(error => {
        if (error) { throw error; }
        console.log(`Server running at: ${server.info.uri}`);
    });
});
