import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { v4 as uuid } from 'uuid';
import { arrayResponse, objResponse } from '../config/responses';
import config from '../config/config';
import modelsController from '../controller/modelsController'
import { Checkout, ProductDetails,ProductInfo } from '../config/types';


declare global {
    namespace Express {
        interface Request {
            products: ProductInfo[];
            rawPrice: number;
            price: number;
            code: string;
            color?: string;
            categoryid: number;
            description?: string;
            stockCount?: number;
            date: string;
        }
    }
}

const NAMESPACE = 'checkout controller';
const get = (req: Request, res: Response, next: NextFunction) => {
    return res.status(config.SUCCESS_STATUS).json(arrayResponse(modelsController.getCheckouts()));
};



const createProduct = (newProduct: Request): Checkout => {
    const newMember: Checkout = {
        id: uuid(),
        date: String(newProduct.date),
        products: newProduct.products
    };

    return newMember;
};

const checkPostResponse = (checkoutElement: Checkout, res: Response) => {
    if (!checkoutElement?.date || !checkoutElement?.products) {
        res.status(config.ERROR_STATUS).json({ msg: 'Error: empty fields' });
    } else {
        modelsController.addCheckout(checkoutElement)
        res.status(config.SUCCESS_STATUS).json(arrayResponse(modelsController.getCheckouts()));
        
    }
};

// create member
const post = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'post CHECK');
    const newMember: Checkout = createProduct(req.body);
    checkPostResponse(newMember, res);
};

export default { post, get };
