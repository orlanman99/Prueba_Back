import { Pool } from 'pg';

export let pool = new Pool();

class DbConn {

    constructor() {
        this.defineConnection();
    }

    async defineConnection(): Promise<any> {

        pool = new Pool({
            database: "postgres",
            host: "localhost",
            password: "docker123",
            user: "postgres",
            port: 5432
        });
        return pool;
    }
}

export const dbConn = new DbConn();
