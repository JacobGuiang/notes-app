import userService from '@/services/user.service';
import catchAsync from '@/utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
//import ApiError from '@/utils/ApiError';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(StatusCodes.CREATED).send(user);
});

const getUser = (req: Request, res: Response) => {
  res.send(req.user);
};

// const getUsers = catchAsync(async (req: Request, res: Response) => {
//   const result = await userService.getUsers();
//   res.send(result);
// });

// const updateUser = catchAsync(async (req: Request, res: Response) => {
//   const user = await userService.updateUserById(
//     Number(req.params.userId),
//     req.body
//   );
//   res.send(user);
// });

// const deleteUser = catchAsync(async (req: Request, res: Response) => {
//   await userService.deleteUserById(Number(req.params.userId));
//   res.status(StatusCodes.NO_CONTENT).send();
// });

export default { createUser, getUser };
