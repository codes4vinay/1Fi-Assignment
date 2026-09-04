import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import productRoutes from './routes/products.js';
import corsMiddleware from './config/cors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 4000;

// Middleware is registered before routes so every API request gets the same policy.
app.use(corsMiddleware);
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, database: 'mongodb', orm: 'mongoose' }));
app.use('/api/products', productRoutes);

const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('/{*splat}', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong', hint: 'Check MONGODB_URI and confirm MongoDB is running' });
});

async function startServer() {
  // Do not accept requests until MongoDB is connected and the API is ready.
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onefi_emi_store');
  app.listen(port, () => console.log(`1Fi EMI API running on http://localhost:${port}`));
}

startServer().catch((error) => {
  console.error('Could not connect to MongoDB:', error.message);
  process.exit(1);
});