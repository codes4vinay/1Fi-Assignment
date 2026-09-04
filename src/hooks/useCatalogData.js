import { useEffect, useState } from 'react';
import { fetchProductBySlug, fetchProducts } from '../services/productApi.js';

const LOAD_ERROR = 'Could not load product data. Please start the API server and seed the database.';

export default function useCatalogData(pathname) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const productSlug = pathname.startsWith('/products/')
        ? pathname.split('/products/')[1]
        : '';

    useEffect(() => {
        let isCurrentRequest = true;

        // Ignore responses from an older route if the user navigates quickly.
        async function loadCatalog() {
            try {
                const productList = await fetchProducts();
                const selectedProduct = productSlug
                    ? await fetchProductBySlug(productSlug)
                    : null;

                if (!isCurrentRequest) return;
                setProducts(productList);
                setProduct(selectedProduct);

                if (productSlug && !selectedProduct) window.location.href = '/';
            } catch (requestError) {
                if (isCurrentRequest) setError(requestError.message || LOAD_ERROR);
            }
        }

        loadCatalog();
        return () => {
            isCurrentRequest = false;
        };
    }, [pathname, productSlug]);

    return { products, product, error };
}
