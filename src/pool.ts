import * as Pg from 'pg';

const pool = new Pg.Pool({ // TODO: get this config info from process.env...
    user: 'admin',
    host: 'localhost',
    database: 'eventhescore',
    password: 'admin',
    port: 5432,
});

export { pool };
