// TODO: Add resolvers for user
// 1. Queries
// 1.1. users
// 1.2. userById
// 2. Mutations
// 2.1. createUser
// 2.2. updateUser
// 2.3. deleteUser

import {User, UserIdWithToken, UserOutput} from '../../interfaces/User';
import userModel from '../models/userModel';
import {GraphQLError} from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    users: async () => {
      return await userModel.find();
    },
    userById: async (_parent: undefined, args: User) => {
      return await userModel.findById(args.id);
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
      const user = new userModel(args);
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        'secret',
        {expiresIn: '365d'}
      );
      user.token = token;
      return await user.save();
    },
    loginUser: async (_parent: undefined, args: User) => {
      const user = await userModel.findOne({username: args.username});
      if (user && (await bcrypt.compare(args.password, user.password))) {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
          },
          'secret',
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
    updateUser: async (_parent: undefined, args: User) => {
      console.log(args);
      return await userModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteUser: async (_parent: undefined, args: User) => {
      return await userModel.findByIdAndDelete(args.id);
    },
  },
};
