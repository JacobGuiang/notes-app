import express from 'express';
import { auth, validate } from '@/middlewares';
import userValidation from '@/validations/user.validation';
import { userController } from '@/controllers';

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser);

router.route('/me').get(auth, userController.getUser);
//   .patch(auth, validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth, validate(userValidation.deleteUser), userController.deleteUser);

export default router;
