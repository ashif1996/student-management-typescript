declare namespace NodeJS {
    export interface ProcessEnv {
        PORT?: string;
        SESSION_SECRET: string;
        MONGO_URI: string;
    }
}