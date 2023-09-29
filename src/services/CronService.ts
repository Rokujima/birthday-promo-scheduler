import cron from 'node-cron';
import UserService from './UserService'
import PromoService from './PromoService';
import { addDays, format } from 'date-fns';
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

class CronService {
  startCronJobs() {
    console.info('Start Cron Job')
    cron.schedule('0 0 * * *', async () => {
      const Cl_User = new UserService();
      const Cl_Promo = new PromoService();

      const fetchUser=  await Cl_User.fetchUsers({
        verifiedStatus: true,
        isBirthday: true
      });

      const currentDate = new Date();

      for(const item of fetchUser){
        const promotion = await Cl_Promo.generatePromoCode({
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
      const Cl_Log = new LogService();
      Cl_Log.create({
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
