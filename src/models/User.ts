import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  isVerified: boolean;
  birthday: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true},
  lastname: { type: String },
  isVerified: { type: Boolean, default: false },
  birthday: { type: Date }
});

export default mongoose.model<IUser>('User', userSchema);
