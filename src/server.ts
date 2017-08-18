import * as Hapi from 'hapi';
import requireHttps from 'hapi-require-https';
import { api } from './api';

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });
server.register([
    requireHttps,
    api,
], error => {
    if (error) { throw error; }
    server.start(error => {
        if (error) { throw error; }
        console.log(`Server running at: ${server.info.uri}`);
    });
});
