import {Document} from 'mongoose';
interface User extends Document {
  username: string;
  password: string;
  role: 'user' | 'admin';
  token: string;
}

interface UserOutput {
  id: string;
  username: string;
  role?: 'user' | 'admin';
}

interface UserIdWithToken {
  id: string;
  token: string;
}

interface TestUser {
  id?: string;
  username?: string;
  password?: string;
  role?: 'user' | 'admin';
  token?: string;
}

export {User, UserOutput, UserIdWithToken, TestUser};
