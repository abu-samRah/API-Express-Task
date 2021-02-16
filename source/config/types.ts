export interface GetResponse {
    responseCode: number;
}

export interface GetObjResponse<T> extends GetResponse {
    entity: T | undefined;
}

export interface GetArrayResponse<T> extends GetResponse {
    entities: T[] | undefined;
}

export type Catagory = { id: string; name: string } | undefined;

export type Product = { id: string; name: string; rawPrice: number; price: number; code: string; color?: string; categoryid: number; description?: string; stockCount?: number; expirationDate?: string } | undefined;

export type ProductDetails = { productId: string; unitPrice: number; quantity: number; subtotal: number };

export type ProductInfo = { product: ProductDetails; total: number; discount: number; paymentAmount: number; paymentMethod: string };

export type Checkout = { id: string; date: string; products: ProductInfo[] } | undefined;