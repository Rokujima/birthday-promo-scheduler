import mongoose, { Document, Schema } from 'mongoose';

export interface IPromo extends Document {
  code: string;
  startDate: Date;
  endDate: Date;
  name: string;
  description: string;
  isUse: boolean;
  amount: number;
  validUserId: string;
}

const promoSchema = new Schema<IPromo>({
  code: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  name: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true, default: 0 },
  validUserId: { type: String }
});

export default mongoose.model<IPromo>('Promo', promoSchema);
