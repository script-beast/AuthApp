import mongoose from 'mongoose';

type userType = {
  _id: mongoose.Types.ObjectId;
  FName: string;
  LName: string;
  email: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export default userType;
