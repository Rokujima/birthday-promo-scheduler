import mongoose, { Document, Schema } from 'mongoose';

interface ILog extends Document {
  event: string;
  date: Date;
  message: string;
}

const logSchema = new Schema<ILog>({
  event: { type: String, required: true },
  date: { type: Date, default: mongoose.now },
  message: { type: String }
});

export default mongoose.model<ILog>('Log', logSchema);
