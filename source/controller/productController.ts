import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { v4 as uuid } from 'uuid';
import { arrayResponse, objResponse } from '../config/responses';
import config from '../config/config';
import modelsController from '../controller/modelsController'
import { Product } from '../config/types';


declare global {
    namespace Express {
        interface Request {
            name: string;
            rawPrice: number;
            price: number;
            code: string;
            color?: string;
            categoryid: number;
            description?: string;
            stockCount?: number;
            expirationDate?: string;
        }
    }
}

const NAMESPACE = 'product controller';
const get = (req: Request, res: Response, next: NextFunction) => {

    return res.status(config.SUCCESS_STATUS).json(arrayResponse(modelsController.getProducts()));
};

const getMember = (req: Request, res: Response, next: NextFunction) => {
    const product = modelsController.getProduct(req.params.id)
    if (product) {
        res.status(config.SUCCESS_STATUS).json(objResponse(product));
    } else {
        res.status(config.ERROR_STATUS).json({ msg: 'message not found' });
    }
};


const createProduct = (newProduct: Request): Product => {
    const newMember: Product = {
        id: uuid(),
        name: String(newProduct.name),
        rawPrice: Number(newProduct.rawPrice),
        price: Number(newProduct.price),
        code: String(newProduct.code),
        color: String(newProduct.color),
        categoryid: Number(newProduct.categoryid),
        description: String(newProduct.description),
        stockCount: Number(newProduct.stockCount),
        expirationDate: String(newProduct.expirationDate)
    };
    
    return newMember;
};

const checkPostResponse = (product: Product, res: Response) => {
   
    if (!product?.name || !product?.rawPrice || !product?.price || !product?.code || !product?.categoryid ) {
        res.status(config.ERROR_STATUS).json({ msg: 'Error: repititve or empty fields' });
    } else if (product.rawPrice <= 0 || product.price < product.rawPrice) {
        res.status(config.ERROR_STATUS).json({ msg: 'Error: price should be more than zero and more than raw price' });
    }  else {
        modelsController.addProduct(product);
        res.status(config.SUCCESS_STATUS).json(arrayResponse(modelsController.getProducts()));
        
    }
};

// create member
const post = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'post CHECK');
    const newMember: Product = createProduct(req.body);
    checkPostResponse(newMember, res);
};

const deleteMember = (req: Request, res: Response, next: NextFunction) => {
    const deletePrdouct = modelsController.deleteProduct(req.params.id)

    if (deletePrdouct) {
        res.status(config.SUCCESS_STATUS).json({ msg: 'member deleted', members: arrayResponse(modelsController.getProducts()) });

    } else {
        res.status(config.ERROR_STATUS).json({ msg: 'wrong id' });
    }
};


const updateMember = (req: Request, res: Response, next: NextFunction) => {
    const updatedMemberInfo = createProduct(req.body);
    const updateProduct = modelsController.updateProduct(req.params.id,updatedMemberInfo);
    if (updateProduct) {
        res.status(config.SUCCESS_STATUS).json({ msg: 'member updated', member: arrayResponse(modelsController.getProducts()) });
    } else {
        res.status(config.ERROR_STATUS).json({ msg: 'memeber not found' });
    }
};
export default { get, post, getMember, deleteMember, updateMember };
