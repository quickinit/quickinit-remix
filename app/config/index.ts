export const appUrl: string = process.env.APP_URL || 'http://localhost:5173';
export const dbUrl: string = process.env.DATABASE_URL || 'mongodb://localhost:27017/test';

export const node_env: 'development' | 'production' | 'test' = process.env.NODE_ENV || 'development';
export const logsDir: string = 'logs';
