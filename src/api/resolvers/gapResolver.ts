// create resolver for gap

import {Spot} from '../../interfaces/Spot';
import {Gap} from '../../interfaces/Gap';
import gapModel from '../models/gapModel';

export default {
  Spot: {
    gap: async (parent: Spot) => {
      return await gapModel.findById(parent.id);
    },
  },
  Mutation: {
    createGap: async (_parent: undefined, args: Gap) => {
      const gap = new gapModel(args);
      return await gap.save();
    },
    updateGap: async (_parent: undefined, args: Gap) => {
      return await gapModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteGap: async (_parent: undefined, args: Gap) => {
      return await gapModel.findByIdAndDelete(args.id);
    },
  },
};
