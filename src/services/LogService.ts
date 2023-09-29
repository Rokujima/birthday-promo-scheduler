import logSchema from './../models/Log';
  
interface CreateLogField {
  event: string;
  date?: Date;
  message: Date;
}

class LogService {
  async create({ event, date, message }: CreateLogField) {
      const logSave = new logSchema({
        event,
        date: date || new Date(),
        message
      });
    
      await logSave.save();
    
      return logSave;
    }
}

export default LogService;
