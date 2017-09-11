import * as Hapi from 'hapi';
import { api } from './api';

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost', routes: { cors: true } });
server.register([
    api,
], error => {
    if (error) { throw error; }
    server.start(error => {
        if (error) { throw error; }
        console.log(`Server running at: ${server.info.uri}`);
    });
});
