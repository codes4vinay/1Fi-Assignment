const API_BASE_URL = '/api';

async function requestJson(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const payload = await response.json();

    if (!response.ok) {
        throw new Error(payload.message || 'The product service returned an error.');
    }

    return payload;
}

// centralized api calls so our components don't have to deal with fetch logic
export async function fetchProducts() {
    const payload = await requestJson('/products');
    return payload.products;
}

export async function fetchProductBySlug(slug) {
    const payload = await requestJson(`/products/${encodeURIComponent(slug)}`);
    return payload.product;
}
