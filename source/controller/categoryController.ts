import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { v4 as uuid } from 'uuid';
import config from '../config/config';
import { arrayResponse, objResponse } from '../config/responses';
import modelsController from '../controller/modelsController'
import { Catagory } from '../config/types';


const NAMESPACE = 'category controller';
const get = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'SAMPLE HEALTH CHECK');
    return res.status(config.SUCCESS_STATUS).json(arrayResponse(modelsController.getCategories()));
};


const getMember = (req: Request, res: Response, next: NextFunction) => {

    res.status(config.SUCCESS_STATUS).json(objResponse(modelsController.getCategorie(req.params.id)));
};

// create member
const post = (req: Request, res: Response, next: NextFunction) => {
    const newMember: Catagory = { id: uuid(), name: String(req.body.name) };

    if (!newMember.name) {
        res.status(config.ERROR_STATUS).json({ msg: 'Error: repititve or empty name' });
    } else {
        modelsController.addCatagory(newMember);
        res.status(config.SUCCESS_STATUS).json(arrayResponse(modelsController.getCategories()));
    }
};

const deleteMember = (req: Request, res: Response, next: NextFunction) => {
    const deleteCategory = modelsController.deleteCategory(req.params.id);

    if (deleteCategory) {

        res.status(config.SUCCESS_STATUS).json({ msg: 'member deleted', members: arrayResponse(modelsController.getCategories()) });
       
    } else {
        res.status(config.ERROR_STATUS).json({ msg: 'wrong id' });
    }
};

const updateMember = (req: Request, res: Response, next: NextFunction) => {
    const updatedMemberInfo: Catagory = {id:uuid(), name: req.body.name} 
    const updateCategory = modelsController.updateCategory(req.params.id,updatedMemberInfo);
    
    if (updateCategory) {
        
        res.status(config.SUCCESS_STATUS).json({ msg: 'member updated', member: arrayResponse(modelsController.getCategories()) });
    
    } else {
        res.status(config.ERROR_STATUS).json({ msg: 'message not found' });
    }
};
export default { get, post, getMember, deleteMember, updateMember };
