import cron from 'node-cron';
import UserService from './UserService'
import PromoService from './PromoService';
import { addDays } from 'date-fns';
import EmailNotification from './NotificationService';
import LogService from './LogService';
import { IUser } from './../models/User';
import { IPromo } from './../models/Promotion'

enum noticationType {
  Email = 'email',
  WhatsApp = 'whatsapp',
}

interface NoticationParams {
  subject: string;
  body: string;
  target: string[];
  notificationType: noticationType
}

const userService = new UserService();
const promoService = new PromoService();
const logService = new LogService();

class CronService {


  startCronJobs() {
    console.info('Start Cron Job')
    cron.schedule('0 0 * * *', async () => {
      
      const fetchUser=  await userService.fetchUsers({
        verifiedStatus: true,
        isBirthday: true
      });

      const currentDate = new Date();

      for(const item of fetchUser){
        const promotion = await promoService.generatePromoCode({
          name: 'Voucher Special Birthday For You',
          amount: 20000,
          endDate: addDays(currentDate, 2),
          startDate: currentDate,
          validUsersID: item._id
        });

        this.GeneratePromotionSuccess(promotion, item);
        this.GeneratePromotionFailed(promotion);
      }

    });
  }

  GeneratePromotionSuccess(promotion: IPromo, user: IUser){
    if(promotion){
      this.sendNotication({
        notificationType: noticationType.Email,
        body: 'Happy Birthday we have a voucher special for you '+promotion.code,
        subject: 'Happy Birthday For'+user.firstname + user.lastname,
        target: [ user.email ],
      });
    }
  }

  GeneratePromotionFailed(promotion: IPromo){
    if(!promotion){
      console.info('Sorry Generate Promotion Problem');
      logService.create({
        event: 'Error Promotion Generated',
        date: new Date(),
        message: promotion
      });
    }
  }

  private getNotificationClass(notificationType: string): any {
    switch (notificationType) {
      case 'email':
        return EmailNotification;
      case 'whatsapp':
        return '';
      default:
        return null; // Return null for unsupported types
    }
  }


  async sendNotication({notificationType, subject, body, target}: NoticationParams){
    const Cl_Notification = this.getNotificationClass(notificationType);
    if (Cl_Notification) {
      const notificationInstance = new Cl_Notification();
      await notificationInstance.send(subject, body, target);
    } else {
      throw new Error(`Unsupported notification type: ${notificationType}`);
    }
  }
}

export default CronService;
