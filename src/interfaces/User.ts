import {Document} from 'mongoose';
interface User extends Document {
  user_name: string;
  password: string;
  role: 'user' | 'admin';
}

export {User};
