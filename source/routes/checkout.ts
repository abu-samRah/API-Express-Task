import express from 'express';
import controller from '../controller/checkoutController';

const router = express.Router();

router.get('/', controller.get);

router.post('/', controller.post);

export = router;
