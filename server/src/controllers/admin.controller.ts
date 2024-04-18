import { Response, Request } from 'express';

import adminModel from '../models/admin.model';

import jwtCommon from '../libs/jwt/common.libs';
import bcryptCommon from '../libs/bcrypt/common.libs';

import catchAsync from '../utils/errorHandling/catchAsync.utils';

import ExpressResponse from '../libs/express/response.libs';

import { logAdminType } from '../validations/logAdmin.zod';
import { resAdminType } from '../validations/resAdmin.zod';
import { refreshTokenType } from '../validations/refreshToken.zod';

class adminController {
  public login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body as logAdminType;

    const admin = await adminModel.findOne({ email });

    if (!admin) return ExpressResponse.notFound(res, 'Not Found');

    const isPasswordMatch = await bcryptCommon.comparePassword(
      password,
      admin.password,
    );

    if (!isPasswordMatch)
      return ExpressResponse.unauthorized(res, 'Invalid Credentials');

    const token = jwtCommon.generateToken(admin._id);
    const refreshToken = jwtCommon.generateRefreshToken(admin._id);

    ExpressResponse.success(res, 'Success', { token, refreshToken });
  });

  public register = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body as resAdminType;

    const admin = await adminModel.findOne({ email });

    if (admin) return ExpressResponse.badRequest(res, 'Email already exist');

    const hashedPassword = await bcryptCommon.hashingPassword(password);

    const newAdmin = new adminModel({ name, email, password: hashedPassword });

    await newAdmin.save();

    ExpressResponse.created(res, 'User Registered Successfully');
  });

  public refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body as refreshTokenType;

    if (!refreshToken) return ExpressResponse.badRequest(res, 'Invalid Token');

    const decoded = jwtCommon.verifyRefreshToken(refreshToken);

    if (!decoded) return ExpressResponse.unauthorized(res, 'Invalid Token');

    if (typeof decoded === 'string')
      return ExpressResponse.unauthorized(res, 'Invalid Token');

    const { id } = decoded;

    const token = jwtCommon.generateToken(id);

    ExpressResponse.success(res, 'Success', { token });
  });
}

export default new adminController();
