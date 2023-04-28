import {GraphQLError} from 'graphql';
import {Gap} from '../../interfaces/Gap';
import {Row} from '../../interfaces/Row';
import {UserIdWithToken} from '../../interfaces/User';
import rowModel from '../models/rowModel';

export default {
  Gap: {
    row: async (parent: Gap) => {
      return await rowModel.findById(parent.row);
    },
  },
  Query: {
    rows: async () => {
      return await rowModel.find();
    },
    rowById: async (_parent: undefined, args: Row) => {
      return await rowModel.findById(args.id);
    },
  },
  Mutation: {
    createRow: async (_parent: undefined, args: Row, user: UserIdWithToken) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      console.log(args);
      const row = new rowModel(args);
      return await row.save();
    },
    updateRow: async (_parent: undefined, args: Row, user: UserIdWithToken) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await rowModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteRow: async (_parent: undefined, args: Row, user: UserIdWithToken) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await rowModel.findByIdAndDelete(args.id);
    },
  },
};
