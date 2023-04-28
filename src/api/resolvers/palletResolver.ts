import {GraphQLError} from 'graphql';
import {Pallet} from '../../interfaces/Pallet';
import {PalletSpot} from '../../interfaces/PalletSpot';
import {UserIdWithToken} from '../../interfaces/User';

import palletModel from '../models/palletModel';

export default {
  PalletSpot: {
    pallet: async (parent: PalletSpot) => {
      console.log(parent);
      return await palletModel.findById(parent.pallet);
    },
  },
  Query: {
    //Get all pallets with their products
    pallets: async () => {
      const jotain = await palletModel.find().populate('products');

      return jotain;
    },
    //Get all pallets by their id with their products
    palletById: async (_parent: undefined, args: Pallet) => {
      return await palletModel.findById(args.id).populate('products');
    },
    palletsByProduct: async (_parent: undefined, args: any) => {
      console.log(args);

      return await palletModel.find({
        products: args.product,
      });
    },
  },
  Mutation: {
    createPallet: async (
      _parent: undefined,
      args: Pallet,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      console.log(args);
      const pallet = new palletModel(args);
      return await pallet.save();
    },
    updatePallet: async (
      _parent: undefined,
      args: Pallet,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      const now = new Date();
      args.lastModified = now;

      return await palletModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deletePallet: async (
      _parent: undefined,
      args: Pallet,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await palletModel.findByIdAndDelete(args.id);
    },
  },
};
