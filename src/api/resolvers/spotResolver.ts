import {Spot} from '../../interfaces/Spot';
import spotModel from '../models/spotModel';

export default {
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
