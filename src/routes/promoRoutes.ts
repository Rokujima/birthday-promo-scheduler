import express, { Request, Response } from 'express';
import PromoController from '../controllers/PromoController';
import PromoService from '../services/PromoService';

const router = express.Router();
const promoController = new PromoController();

router.get('/', (req: Request, res: Response) => {
  promoController.fetch(req, res);
});

export default router;