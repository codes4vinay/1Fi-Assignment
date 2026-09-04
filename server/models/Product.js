import mongoose from 'mongoose';

// EMI plans are embedded because they are always read with their product variant.
const emiPlanSchema = new mongoose.Schema({
    monthlyAmount: { type: Number, required: true },
    tenureMonths: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    cashback: { type: Number, default: 0 },
    backedBy: { type: String, default: 'Mutual fund-backed EMI' }
}, { _id: true });

// A variant owns its pricing, appearance, image gallery, and available plans.
const variantSchema = new mongoose.Schema({
    slug: { type: String, required: true },
    label: { type: String, required: true },
    storage: { type: String, required: true },
    color: { type: String, required: true },
    colorHex: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    payNow: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    galleryImages: { type: [String], required: true },
    emiPlans: { type: [emiPlanSchema], default: [] }
}, { _id: true });

// Specifications are stored as label/value pairs so products can have different attributes.
const specificationSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });

// Product documents contain the complete read model used by the product page.
const productSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    badge: String,
    description: { type: String, required: true },
    rating: { type: Number, default: 4.2 },
    soldCount: { type: String, default: '1K+' },
    seller: { type: String, required: true },
    warranty: { type: String, required: true },
    specifications: { type: [specificationSchema], default: [] },
    variants: { type: [variantSchema], required: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);