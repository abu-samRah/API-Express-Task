import express from 'express';
import controller from '../controller/productController';

const router = express.Router();

router.get('/', controller.get);

router.get('/:id', controller.getMember);

router.post('/', controller.post);

router.delete('/:id', controller.deleteMember);

router.put('/:id', controller.updateMember);
export = router;
