import mongoose from 'mongoose';
import { Response, Request } from 'express';

import userModel from '../models/user.model';

import catchAsync from '../utils/errorHandling/catchAsync.utils';

import ExpressResponse from '../libs/express/response.libs';

import { addUserType } from 'validations/addUser.zod';

class userController {
  public createUser = catchAsync(async (req: Request, res: Response) => {
    const { email, LName, FName } = req.body as addUserType;

    await userModel.create({ email, LName, FName });
    ExpressResponse.created(res, 'User created successfully');
  });

  public getUsers = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const totalPage = Math.ceil((await userModel.countDocuments()) / limit);
    const users = await userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);

    ExpressResponse.success(res, 'All Users', {
      users,
      totalPage,
    });
  });

  public getUser = catchAsync(async (req: Request, res: Response) => {  
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ExpressResponse.badRequest(res, 'Invalid user id');
    }

    const user = await userModel.findById(id);

    if (!user) {
      return ExpressResponse.notFound(res, 'User not found');
    }

    ExpressResponse.success(res, 'User', user);
  });

  public updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, LName, FName } = req.body as addUserType;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ExpressResponse.badRequest(res, 'Invalid user id');
    }

    const user = await userModel.findById(id);

    if (!user) {
      return ExpressResponse.notFound(res, 'User not found');
    }

    await userModel.findByIdAndUpdate(id, { email, LName, FName });
    ExpressResponse.accepted(res, 'User updated successfully');
  });

  public deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ExpressResponse.badRequest(res, 'Invalid user id');
    }

    const user = await userModel.findById(id);

    if (!user) {
      return ExpressResponse.notFound(res, 'User not found');
    }

    // Hard delete
    // await userModel.findByIdAndDelete(id);

    // Soft delete
    await userModel.findByIdAndUpdate(id, { isDeleted: true });
    ExpressResponse.accepted(res, 'User deleted successfully');
  });
}

export default new userController();
