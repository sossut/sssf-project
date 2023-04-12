declare global {
  import {Types} from 'mongoose';
  namespace Express {
    interface User {
      password: string;
      role: 'user' | 'admin';
      user_name: string;
      _id: Types.ObjectId;
    }
  }
}
