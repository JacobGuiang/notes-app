import { z } from 'zod';
import httpStatus from 'http-status-codes';
import pick from '@/utils/pick';
import ApiError from '@/utils/ApiError';
import { Request, Response, NextFunction } from 'express';

const validate =
  (schema: z.AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const object = pick(req, ['params', 'query', 'body']);
    const result = schema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, result.data);
    return next();
  };

export default validate;