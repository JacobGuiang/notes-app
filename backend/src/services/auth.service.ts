import ApiError from '@/utils/ApiError';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import db from '@/config/db';

const login = async (username: string, password: string) => {
  const user = await db
    .selectFrom('user')
    .selectAll()
    .where('username', '=', username.toLowerCase())
    .executeTakeFirst();
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'Incorrect username or password'
    );
  }
  return { id: user.id, username: user.username };
};

export default { login };
