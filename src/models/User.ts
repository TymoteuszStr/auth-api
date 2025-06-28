import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserCredentials } from '../interfaces/UserCredentials';

export interface IUser extends UserCredentials, Document {
  comparePassword(plain: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plain: string) {
  return bcrypt.compare(plain, this.password);
};

export const User = model<IUser>('User', userSchema);
