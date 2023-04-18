import {PalletSpot} from '../../interfaces/PalletSpot';
import {Spot} from '../../interfaces/Spot';
import spotModel from '../models/spotModel';

export default {
  PalletSpot: {
    spot: async (parent: PalletSpot) => {
      return await spotModel.findById(parent.spot);
    },
  },
  Query: {
    spots: async () => {
      return await spotModel.find();
    },
    spotById: async (_parent: undefined, args: Spot) => {
      return await spotModel.findById(args.id);
    },
  },
  Mutation: {
    createSpot: async (_parent: undefined, args: Spot) => {
      const spot = new spotModel(args);
      return await spot.save();
    },
    updateSpot: async (_parent: undefined, args: Spot) => {
      return await spotModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteSpot: async (_parent: undefined, args: Spot) => {
      return await spotModel.findByIdAndDelete(args.id);
    },
  },
};
