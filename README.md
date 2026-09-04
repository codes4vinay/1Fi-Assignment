# 1Fi EMI Store

A MERN application that displays smartphones with selectable EMI plans backed by mutual funds. Product, variant, pricing, image, and EMI plan data is served by Express from MongoDB; the React client does not contain product records.

## Tech Stack

- React 19 + Vite
- Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose

## Project Structure

```text
src/
  components/       Reusable UI: header, footer, gallery, EMI plans, modal, states
  hooks/             React data-loading hooks
  pages/             Route-level home and product page composition
  services/          Backend API client functions
  utils/             Shared formatting helpers
server/
  controllers/      Request handlers and API response mapping
  models/            Mongoose document schemas
  routes/            Express route definitions
  seed.js            MongoDB seed data and online product galleries
```

The frontend keeps network access in `src/services`, request lifecycle state in `src/hooks`, and reusable presentation in `src/components`. This keeps pages focused on composition and makes each part easier to test or replace.

## Run Locally

Install MongoDB locally or use a MongoDB Atlas database. Docker is not required.

```bash
npm install
copy .env.example .env
npm run seed
npm run dev
```

On macOS/Linux, use `cp .env.example .env` instead of `copy`.

- Frontend: `http://localhost:5173`
- Product page: `http://localhost:5173/products/iphone-17-pro`
- API: `http://localhost:4000`

Update `MONGODB_URI` in `.env` when using Atlas:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/onefi_emi_store
PORT=4000
FRONTEND_URL=http://localhost:5173
```

For deployment, set `FRONTEND_URL` to the deployed frontend origin. If more than one browser origin is needed, set `CORS_ORIGINS` as a comma-separated list. Requests without an `Origin` header, such as health checks and server-to-server calls, remain supported.

## API

### `GET /api/products`

Returns all products with their variants and summary pricing.

```json
{
  "products": [
    {
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "startingPrice": 124900,
      "emiFrom": 2282,
      "variants": []
    }
  ]
}
```

### `GET /api/products/:slug`

Returns one product, all color/storage variants, and seven EMI plans for every variant.

```json
{
  "product": {
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "variants": [
      {
        "label": "Cosmic Orange, 128GB",
        "mrp": 134900,
        "price": 134900,
        "imageUrl": "https://images.snapmint.com/product_assets/images/001/154/792/large/open-uri20251021-2855301-1lwknri?1761017541",
        "galleryImages": [
          "https://images.snapmint.com/product_assets/images/001/154/792/large/open-uri20251021-2855301-1lwknri?1761017541",
          "https://images.snapmint.com/product_assets/images/001/154/793/thumb/open-uri20251021-2855301-14q9hu6?1761017541",
          "https://images.snapmint.com/product_assets/images/001/154/794/thumb/open-uri20251021-2855301-151nlj6?1761017541"
        ],
        "emiPlans": [
          {
            "monthlyAmount": 38222,
            "tenureMonths": 3,
            "interestRate": 0,
            "cashback": 7500,
            "backedBy": "Mutual fund-backed EMI"
          }
        ]
      }
    ]
  }
}
```

### `GET /api/health`

Returns the API and database adapter status.

## MongoDB Schema

The `Product` Mongoose model stores one document per product in the `products` collection. Product documents contain:

| Field                               | Type   | Description                                   |
| ----------------------------------- | ------ | --------------------------------------------- |
| `slug`                              | String | Unique product URL identifier                 |
| `name`, `brand`, `category`         | String | Product catalogue information                 |
| `description`, `seller`, `warranty` | String | Product and seller details                    |
| `rating`                            | Number | Product rating                                |
| `soldCount`                         | String | Displayed sales count                         |
| `specifications`                    | Array  | Label/value technical specifications          |
| `variants`                          | Array  | Colour, storage, pricing, image, and EMI data |

Each embedded variant contains:

- `slug`, `label`, `storage`, `color`, and `colorHex`
- `mrp`, `price`, and `payNow`
- `imageUrl` and `galleryImages`
- `emiPlans`: monthly amount, tenure, interest rate, cashback, and mutual-fund backing label

Embedding variants and plans keeps the product page request to one MongoDB query and makes each product easy to seed or update as a unit. The seed file is [server/seed.js](server/seed.js).

## Seed Data

Run the seed command after configuring `MONGODB_URI`:

```bash
npm run seed
```

The repeatable seed creates three products, each with three variants and seven EMI plans per variant:

- Apple iPhone 17 Pro
- Samsung Galaxy S24 Ultra
- Google Pixel 9 Pro

The seed also stores product images, variant galleries, pricing, pay-now amounts, cashback, and interest rates.

## Assignment Coverage

- Three products with at least three variants each
- Unique product routes such as `/products/iphone-17-pro`
- Dynamic backend data loaded through Express APIs
- MRP, price, product image, color/storage variants, and EMI plan details
- Selectable plans and a working proceed button
- Responsive Tailwind UI matching the supplied product-page reference
