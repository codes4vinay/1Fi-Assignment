import Product from '../models/Product.js';

// Convert Mongo subdocuments into the stable API shape used by React.
function mapPlan(plan) {
  return { id: String(plan._id), monthlyAmount: plan.monthlyAmount, tenureMonths: plan.tenureMonths, interestRate: plan.interestRate, cashback: plan.cashback, backedBy: plan.backedBy };
}

function mapVariant(variant) {
  return { id: String(variant._id), slug: variant.slug, label: variant.label, storage: variant.storage, color: variant.color, colorHex: variant.colorHex, mrp: variant.mrp, price: variant.price, payNow: variant.payNow, imageUrl: variant.imageUrl, galleryImages: variant.galleryImages, emiPlans: variant.emiPlans.map(mapPlan) };
}

function mapProduct(product) {
  return { id: product.id, slug: product.slug, name: product.name, brand: product.brand, category: product.category, badge: product.badge, description: product.description, rating: product.rating, soldCount: product.soldCount, seller: product.seller, warranty: product.warranty, specifications: product.specifications };
}

// The listing endpoint includes lightweight summaries plus variant data for the home page.
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 }).lean();
    res.json({
      products: products.map((product) => ({
        ...mapProduct(product),
        variants: product.variants.map(mapVariant),
        startingPrice: Math.min(...product.variants.map((variant) => variant.price)),
        emiFrom: Math.min(...product.variants.flatMap((variant) => variant.emiPlans.map((plan) => plan.monthlyAmount)))
      }))
    });
  } catch (error) { next(error); }
};

// The detail endpoint returns the complete product and all selectable EMI plans.
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product: { ...mapProduct(product), variants: product.variants.map(mapVariant) } });
  } catch (error) { next(error); }
};