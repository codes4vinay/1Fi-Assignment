import mongoose from 'mongoose';

// we embed emi plans here since we always need them together with variants
const emiPlanSchema = new mongoose.Schema({
    monthlyAmount: { type: Number, required: true },
    tenureMonths: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    cashback: { type: Number, default: 0 },
    backedBy: { type: String, default: 'Mutual fund-backed EMI' }
}, { _id: true });

// details for each specific version of a product (like a black 128gb iphone)
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

// flexible key-value pairs for different types of specs
const specificationSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });

// the main product schema that holds everything together
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