import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';

// Seed input is kept outside the UI so all product content remains database-backed.
const products = [
    {
        slug: 'iphone-17-pro', name: 'iPhone 17 Pro', brand: 'Apple', category: 'Smart Phones', badge: 'NEW',
        description: 'A19 Pro chip, pro camera system, titanium design and premium finishes on flexible EMI plans.', rating: 4.2, soldCount: '70+', seller: 'Balaji Infocom', warranty: '1 year manufacturer warranty',
        specifications: [{ label: 'Display', value: '6.3 inch Super Retina XDR' }, { label: 'Processor', value: 'A19 Pro' }, { label: 'Rear camera', value: '48MP + 48MP + 48MP' }, { label: 'Operating system', value: 'iOS' }],
        variants: [
            ['iphone-17-pro-cosmic-orange-128', 'Cosmic Orange', '#f77d3d', 124900, '128GB'],
            ['iphone-17-pro-silver-256', 'Silver', '#d8d9d6', 134900, '256GB'],
            ['iphone-17-pro-deep-blue-512', 'Deep Blue', '#3f4b79', 149900, '512GB']
        ]
    },
    {
        slug: 'samsung-s24-ultra', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'Smart Phones', badge: 'AI POWERED',
        description: 'Galaxy AI is here. Welcome to the era of mobile AI with a titanium frame and pro-grade camera system.', rating: 4.3, soldCount: '5K+', seller: 'Samsung authorised seller', warranty: '1 year manufacturer warranty',
        specifications: [{ label: 'Display', value: '6.8 inch QHD+ Dynamic AMOLED 2X' }, { label: 'Processor', value: 'Snapdragon 8 Gen 3' }, { label: 'Rear camera', value: '200MP + 50MP + 12MP + 10MP' }, { label: 'Operating system', value: 'Android' }],
        variants: [
            ['samsung-s24-ultra-titanium-gray-256', 'Titanium Gray', '#5c5c5c', 129999, '256GB'],
            ['samsung-s24-ultra-titanium-black-512', 'Titanium Black', '#2b2b2b', 139999, '512GB'],
            ['samsung-s24-ultra-titanium-violet-1tb', 'Titanium Violet', '#453857', 159999, '1TB']
        ]
    },
    {
        slug: 'google-pixel-9-pro', name: 'Google Pixel 9 Pro', brand: 'Google', category: 'Smart Phones', badge: 'BEST CAMERA',
        description: 'The most advanced Pixel camera ever with Google AI features and a clean Android experience.', rating: 4.1, soldCount: '3K+', seller: 'Google authorised seller', warranty: '1 year manufacturer warranty',
        specifications: [{ label: 'Display', value: '6.3 inch Super Actua display' }, { label: 'Processor', value: 'Google Tensor G4' }, { label: 'Rear camera', value: '50MP + 48MP + 48MP' }, { label: 'Operating system', value: 'Android' }],
        variants: [
            ['pixel-9-pro-obsidian-128', 'Obsidian', '#222222', 99999, '128GB'],
            ['pixel-9-pro-porcelain-256', 'Porcelain', '#f0efe9', 109999, '256GB'],
            ['pixel-9-pro-hazel-512', 'Hazel', '#686f67', 119999, '512GB']
        ]
    }
];

function galleryFor(productSlug, color) {
    // Each color gets its own primary image and gallery ordering.
    if (productSlug === 'iphone-17-pro') {
        const galleries = {
            'Cosmic Orange': ['001/154/792/large/open-uri20251021-2855301-1lwknri?1761017541', '001/154/793/thumb/open-uri20251021-2855301-14q9hu6?1761017541', '001/154/794/thumb/open-uri20251021-2855301-151nlj6?1761017541'],
            Silver: ['001/154/806/large/open-uri20251021-2855301-v0364x?1761017558', '001/154/807/thumb/open-uri20251021-2855301-1w6zv?1761017558', '001/154/808/thumb/open-uri20251021-2855301-4vhtc4?1761017558'],
            'Deep Blue': ['001/154/799/large/open-uri20251021-2855301-1u2r5zo?1761017549', '001/154/800/thumb/open-uri20251021-2855301-9rqvoi?1761017549', '001/154/801/thumb/open-uri20251021-2855301-swkfff?1761017549']
        };
        return galleries[color].map((path) => `https://images.snapmint.com/product_assets/images/${path}`);
    }

    if (productSlug === 'samsung-s24-ultra') {
        const gallery = [
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/SAMSUNG_Galaxy_S24_Ultra.jpg/960px-SAMSUNG_Galaxy_S24_Ultra.jpg',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/SAMSUNG_Galaxy_S24_Ultra_%282%29.jpg/960px-SAMSUNG_Galaxy_S24_Ultra_%282%29.jpg',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Samsung_S24_Ultra_Phone.png/960px-Samsung_S24_Ultra_Phone.png'
        ];
        const start = { 'Titanium Gray': 0, 'Titanium Black': 1, 'Titanium Violet': 2 }[color] ?? 0;
        return gallery.map((_, index) => gallery[(start + index) % gallery.length]);
    }

    const gallery = [
        'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-1.jpg',
        'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/ae/Google_Pixel_9_%28Obsidian%29_front.svg'
    ];
    const start = { Obsidian: 0, Porcelain: 1, Hazel: 2 }[color] ?? 0;
    return gallery.map((_, index) => gallery[(start + index) % gallery.length]);
}

function plansFor(price) {
    // Calculate the monthly payment from the financed amount for every allowed tenure.
    const financedAmount = price - Math.ceil(price * 0.15);
    return [3, 6, 12, 24, 36, 48, 60].map((tenureMonths) => {
        const interestRate = tenureMonths > 24 ? 10.5 : 0;
        const monthlyRate = interestRate / 100 / 12;
        const monthlyAmount = interestRate === 0
            ? Math.ceil(financedAmount / tenureMonths)
            : Math.ceil((financedAmount * monthlyRate * (1 + monthlyRate) ** tenureMonths) / ((1 + monthlyRate) ** tenureMonths - 1));
        return { monthlyAmount, tenureMonths, interestRate, cashback: 7500, backedBy: 'Mutual fund-backed EMI' };
    });
}

// Convert the compact seed tuples into the nested MongoDB document shape.
const documents = products.map((product) => ({
    ...product,
    variants: product.variants.map(([slug, color, colorHex, price, storage]) => ({
        slug, label: `${color}, ${storage}`, storage, color, colorHex, mrp: price + (price < 134900 ? 3000 : 0), price,
        payNow: Math.ceil(price * 0.15),
        galleryImages: galleryFor(product.slug, color),
        imageUrl: galleryFor(product.slug, color)[0],
        emiPlans: plansFor(price)
    }))
}));

// Re-seeding is intentionally repeatable: replace old demo data with the current dataset.
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onefi_emi_store');
await Product.deleteMany({});
await Product.insertMany(documents);
console.log(`Seeded ${documents.length} products in MongoDB`);
await mongoose.disconnect();