import mongoose from 'mongoose';
import userType from '../interfaces/models/user.types';

const userSchema = new mongoose.Schema<userType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    FName: {
      type: String,
      required: true,
    },
    LName: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<userType>('user', userSchema);
