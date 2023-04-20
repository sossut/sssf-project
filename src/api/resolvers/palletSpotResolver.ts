import {PalletSpot} from '../../interfaces/PalletSpot';
import palletSpotModel from '../models/palletSpotModel';

export default {
  Query: {
    palletSpots: async () => {
      return await palletSpotModel.find();
    },
    palletSpotById: async (_parent: undefined, args: PalletSpot) => {
      console.log(args);
      return await palletSpotModel.findById(args.id);
    },
  },
  Mutation: {
    createPalletSpot: async (_parent: undefined, args: PalletSpot) => {
      console.log(args);
      const ps = new palletSpotModel(args);
      console.log(ps);
      return await ps.save();
    },
    updatePalletSpot: async (_parent: undefined, args: PalletSpot) => {
      return await palletSpotModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deletePalletSpot: async (_parent: undefined, args: PalletSpot) => {
      return await palletSpotModel.findByIdAndDelete(args.id);
    },
  },
};
