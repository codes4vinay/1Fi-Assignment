import cors from 'cors';

const developmentOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const configuredOrigins = [process.env.FRONTEND_URL, ...(process.env.CORS_ORIGINS || '').split(',')]
    .filter(Boolean)
    .map((origin) => origin.trim())
    .filter(Boolean);
const allowedOrigins = new Set(configuredOrigins.length ? configuredOrigins : developmentOrigins);

// Keep API tools and server-to-server requests working when no browser Origin exists.
export const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }

        callback(null, false);
    },
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
    optionsSuccessStatus: 204
};

export default cors(corsOptions);
