// mongoose schema for user
// intface User is located in src/interfaces/User.ts

import mongoose from 'mongoose';
import {User} from '../../interfaces/User';

const userModel = new mongoose.Schema<User>({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});

export default mongoose.model<User>('User', userModel);
