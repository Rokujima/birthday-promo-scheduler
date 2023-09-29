import nodemailer from 'nodemailer';

interface NotificationParams {
    subject: string;
    message: string;
    recipients: string[];
}
  
abstract class Notifications {
    protected params: NotificationParams;
  
    constructor(params: NotificationParams) {
      this.params = params;
    }
  
    abstract send(): void;
}

class EmailNotification extends Notifications {

    private senderEmail = process.env.SENDER_EMAIL;
    private senderPassword = process.env.SENDER_PASSWORD;

    async send(): Promise<void> {
      const { subject, message, recipients } = this.params;
  
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.USER,
          pass: this.senderPassword,
        },
      });
  
      const mailOptions = {
        from: this.senderEmail,
        to: recipients.join(', '),
        subject: subject,
        text: message,
      };
  
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipients.join(', ')} with subject: ${subject}`);
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
      }
    }
  }

  export default EmailNotification;