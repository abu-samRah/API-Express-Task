const catagory = [
    { id: '1', name: 'vegetables' },
    { id: '2', name: 'drinks' }
];

type Product = { id: string; name: string; rawPrice: number; price: number; code: string; color?: string; categoryid: number; description?: string; stockCount?: number; expirationDate?: string };
const element1: Product = {
    id: '1',
    name: 'apple',
    rawPrice: 8,
    price: 11,
    code: 'ddd-abc-1234',
    color: 'green',
    categoryid: 1,
    description: 'apples are good',
    stockCount: 100,
    expirationDate: '2022-01-20'
};

const element2: Product = {
    id: '2',
    name: 'mango',
    rawPrice: 15,
    price: 17,
    code: 'ccc-abc-1234',
    color: 'yellow',
    categoryid: 1,
    description: 'mangos are good',
    stockCount: 100,
    expirationDate: '2022-02-18'
};
const products = [element1, element2];

type ProductDetails = { productId: string; unitPrice: number; quantity: number; subtotal: number };

type ProductInfo = { product: ProductDetails; total: number; discount: number; paymentAmount: number; paymentMethod: string };

type Checkout = { id: string; date: string; products: ProductInfo[] };

const productDetails: ProductDetails = { productId: '1', unitPrice: 2, quantity: 3, subtotal: 6 };
const productInfo: ProductInfo = { product: productDetails, total: 6, discount: 2, paymentAmount: 6, paymentMethod: 'cash' };
const checkoutElement: Checkout = { id: '1', date: '2022-02-18', products: [productInfo] };

const checkouts = [checkoutElement];
export default { catagory: catagory, product: products, checkout: checkouts };
