import {Pallet} from '../../interfaces/Pallet';
import {PalletSpot} from '../../interfaces/PalletSpot';
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
      return await palletModel.find().populate('products');
    },
    //Get all pallets by their id with their products
    palletById: async (_parent: unknown, args: Pallet) => {
      return await palletModel.findById(args.id).populate('products');
    },
  },
  Mutation: {
    createPallet: async (_parent: unknown, args: Pallet) => {
      console.log(args);
      const pallet = new palletModel(args);
      return await pallet.save();
    },
    updatePallet: async (_parent: unknown, args: Pallet) => {
      const now = new Date();
      args.lastModified = now;
      return await palletModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deletePallet: async (_parent: unknown, args: Pallet) => {
      return await palletModel.findByIdAndDelete(args.id);
    },
  },
};
