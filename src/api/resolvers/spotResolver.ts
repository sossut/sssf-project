import {GraphQLError} from 'graphql';
import {PalletSpot} from '../../interfaces/PalletSpot';
import {Spot} from '../../interfaces/Spot';
import spotModel from '../models/spotModel';
import gapModel from '../models/gapModel';
import rowModel from '../models/rowModel';
import {UserIdWithToken} from '../../interfaces/User';

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
    createSpot: async (
      _parent: undefined,
      args: Spot,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      const spot = new spotModel(args);
      return await spot.save();
    },
    createSpots: async (
      _parent: undefined,
      args: any,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      for (let i = 0; i < args.numberOfRows; i++) {
        const row = new rowModel({
          rowNumber: i + 1,
          gaps: args.rowData[i],
        });
        await row.save();

        for (let j = 0; j < args.rowData[i]; j++) {
          const gap = new gapModel({
            row: row._id,
            gapNumber: j + 1,
          });
          await gap.save();

          for (let k = 0; k < gap.spots; k++) {
            const spot = new spotModel({
              spotNumber: k + 1,
              gap: gap._id,
            });
            await spot.save();
          }
        }
      }
    },
    updateSpot: async (
      _parent: undefined,
      args: Spot,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await spotModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteSpot: async (
      _parent: undefined,
      args: Spot,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await spotModel.findByIdAndDelete(args.id);
    },
  },
};
