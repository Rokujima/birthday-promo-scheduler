
import app from './app';
import CronService from './services/CronService';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const cronService = new CronService();
cronService.startCronJobs();
