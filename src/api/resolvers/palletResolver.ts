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
      const jotain = await palletModel.find().populate('products');
      // console.log(jotain[0].products);

      const joootain = [
        {
          id: '643d28cc1175c7575df31ff5',
          products: [
            {
              name: 'Lautanen 10cm',
              weight: 0.5,
              code: '3391',
              __v: 0,
            },
            {
              name: 'Lautanen 25cm',
              weight: 0.8,
              code: '5040',
              __v: 0,
            },
          ],
          arrival: '2023-04-17T11:08:46.177Z',
          lastModified: '2023-04-17T11:08:46.177Z',
          __v: 0,
        },
        {
          id: '643d292094602840ebbe8448',
          products: [
            {
              name: 'Lautanen 10cm',
              weight: 0.5,
              code: '3391',
              __v: 0,
            },
            {
              name: 'Lautanen 25cm',
              weight: 0.8,
              code: '5040',
              __v: 0,
            },
          ],
          arrival: '2023-04-17T11:10:23.156Z',
          lastModified: '2023-04-17T11:10:23.156Z',
          __v: 0,
        },
      ];
      return jotain;
    },
    //Get all pallets by their id with their products
    palletById: async (_parent: undefined, args: Pallet) => {
      return await palletModel.findById(args.id).populate({
        path: 'products',
      });
    },
  },
  Mutation: {
    createPallet: async (_parent: undefined, args: Pallet) => {
      console.log(args);
      const pallet = new palletModel(args);
      return await pallet.save();
    },
    updatePallet: async (_parent: undefined, args: Pallet) => {
      const now = new Date();
      args.lastModified = now;
      return await palletModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deletePallet: async (_parent: undefined, args: Pallet) => {
      return await palletModel.findByIdAndDelete(args.id);
    },
  },
};
