import {GraphQLError} from 'graphql';
import {PalletSpot} from '../../interfaces/PalletSpot';
import {UserIdWithToken} from '../../interfaces/User';
import gapModel from '../models/gapModel';

import palletSpotModel from '../models/palletSpotModel';
import rowModel from '../models/rowModel';
import spotModel from '../models/spotModel';

export default {
  Query: {
    palletSpots: async () => {
      return await palletSpotModel.find();
    },
    palletSpotById: async (_parent: undefined, args: PalletSpot) => {
      console.log(args);
      return await palletSpotModel.findById(args.id);
    },
    palletSpotsByPallet: async (_parent: undefined, args: any) => {
      console.log(args);

      return await palletSpotModel.find({
        pallet: args.pallet,
      });
    },
    palletSpotBySpot: async (_parent: undefined, args: any) => {
      console.log(args);

      return await palletSpotModel.findOne({
        spot: args.spot,
      });
    },
  },
  Mutation: {
    createPalletSpot: async (
      _parent: undefined,
      args: PalletSpot,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      console.log(args);
      const ps = new palletSpotModel(args);
      console.log(ps);
      return await ps.save();
    },
    createPalletSpots: async (
      _parent: undefined,
      args: any,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      const array = [];
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
            const ps = new palletSpotModel({
              spot: spot._id,
            });
            array.push(ps);
            await ps.save();
            await spot.save();
          }
        }
      }
      return array;
    },
    updatePalletSpot: async (
      _parent: undefined,
      args: PalletSpot,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await palletSpotModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deletePalletSpot: async (
      _parent: undefined,
      args: PalletSpot,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await palletSpotModel.findByIdAndDelete(args.id);
    },
  },
};
