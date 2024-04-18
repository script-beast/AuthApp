import express from 'express';

import adminController from '../controllers/admin.controller';
import userController from '../controllers/user.controller';

import validate from '../middlewares/validation.zod';

import resAdmin from '../validations/resAdmin.zod';
import logAdmin from '../validations/logAdmin.zod';
import addUser from '../validations/addUser.zod';
import refreshToken from '../validations/refreshToken.zod';

import adminAuth from '../middlewares/admin.auth';

const router = express.Router();

router.post('/register', validate(resAdmin), adminController.register);
router.post('/login', validate(logAdmin), adminController.login);
router.post(
  '/refresh-token',
  validate(refreshToken),
  adminController.refreshToken,
);
router.get('/users', adminAuth, userController.getUsers);
router.post('/users', adminAuth, validate(addUser), userController.createUser);
router.get('/users/:id', adminAuth, userController.getUser);
router.put(
  '/users/:id',
  adminAuth,
  validate(addUser),
  userController.updateUser,
);
router.delete('/users/:id', adminAuth, userController.deleteUser);

export default router;
