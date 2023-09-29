import { Request, Response } from 'express';
import PromoService from './../services/PromoService';

const promoService = new PromoService();

class PromoController {

  async fetch(req: Request, res: Response) {
    try {
      res.json(await promoService.fetchPromo());
    } catch (error) {
      res.status(500).json({ message: 'Error fetch promo' });
    }
  }
}

export default PromoController;
