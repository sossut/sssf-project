import {User, UserIdWithToken} from '../../interfaces/User';
import userModel from '../models/userModel';
import {GraphQLError} from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    users: async () => {
      const result = await userModel.find().select('username');
      console.log(result);
      return result;
    },
    userById: async (_parent: undefined, args: User) => {
      return await userModel.findById(args.id).select('username');
    },
    checkToken: async (
      _parent: undefined,
      _args: undefined,
      user: UserIdWithToken
    ) => {
      console.log(user);

      const response = await userModel.findOne({_id: user.id});
      if (!response) {
        throw new GraphQLError('Invalid token');
      }
      console.log('res', response);
      const message = {
        message: 'Valid token',
        token: response.token,
        username: response.username,
        id: response._id,
      };
      console.log(message);
      return message;
    },
  },
  Mutation: {
    createUser: async (_parent: undefined, args: User) => {
      const oldUser = await userModel.findOne({username: args.username});
      if (oldUser) {
        throw new GraphQLError('Username already exists');
      }
      const ecryptedPassword = await bcrypt.hash(args.password, 10);
      args.password = ecryptedPassword;
      console.log(args);
      const user = new userModel(args);

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET!,
        {expiresIn: '365d'}
      );
      user.token = token;
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', user);
      const result = await user.save();
      return result;
    },
    loginUser: async (_parent: undefined, args: User) => {
      const user = await userModel.findOne({username: args.username});
      if (user && (await bcrypt.compare(args.password, user.password))) {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
          },
          process.env.JWT_SECRET!,
          {expiresIn: '365d'}
        );
        user.token = token;

        const message = {
          message: 'Login successful',
          token,
          username: user.username,
          id: user._id,
        };
        return message;
      } else {
        throw new GraphQLError('Invalid username or password');
      }
    },
    updateUser: async (
      _parent: undefined,
      args: User,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      console.log(args);
      return await userModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteUser: async (
      _parent: undefined,
      args: User,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await userModel.findByIdAndDelete(args.id);
    },
  },
};
