import express from 'express';
import { getProducts, getProductBySlug } from '../controllers/productsController.js';

const router = express.Router();

// Product routes stay separate from server startup so the API can grow independently.
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

export default router;