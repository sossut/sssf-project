import {PalletSpot} from '../../interfaces/PalletSpot';
import {Spot} from '../../interfaces/Spot';
import spotModel from '../models/spotModel';
import gapModel from '../models/gapModel';
import rowModel from '../models/rowModel';

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
    // find spot by row and gap
    spotByRowGap: async (_parent: undefined, args: any) => {
      const row = await rowModel.findOne({rowNumber: args.rowNumber});

      const gap = await gapModel.findOne({
        row: row?._id,
        gapNumber: args.gapNumber,
      });

      const spot = await spotModel.findOne({
        spotNumber: args.spotNumber,
        gap: gap?._id,
      });

      return spot;
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
