  import promoSchema, { IPromo } from './../models/Promotion';
  
  interface CreatePromoField {
    name: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    validUsersID: string[];
  }

  
  class PromoService {
    generateUniquePromoCode(length: number = 8): string {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let promoCode = "";
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          promoCode += charset.charAt(randomIndex);
        }
      
        return promoCode;
    }

    async generatePromoCode({ name, startDate, endDate, amount, validUsersID }: CreatePromoField): Promise<IPromo> {
        const promoCode = this.generateUniquePromoCode(); 
      
        const promo = new promoSchema({
          code: promoCode,
          name,
          startDate,
          endDate,
          amount,
          validUsersID,
        });
      
        await promo.save();
      
        return promo;
      }

      async fetchPromo(): Promise<IPromo[]> {
        return promoSchema.find().exec();
      }
  }

  export default PromoService;
  