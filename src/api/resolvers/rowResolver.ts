import {PalletSpot} from '../../interfaces/PalletSpot';
import {Row} from '../../interfaces/Row';
import rowModel from '../models/rowModel';

export default {
  PalletSpot: {
    row: async (parent: PalletSpot) => {
      console.log(parent);
      return await rowModel.findById(parent.row);
    },
  },
  Query: {
    rows: async () => {
      return await rowModel.find();
    },
    rowById: async (_parent: undefined, args: Row) => {
      return await rowModel.findById(args.id);
    },
  },
  Mutation: {
    createRow: async (_parent: undefined, args: Row) => {
      console.log(args);
      const row = new rowModel(args);
      return await row.save();
    },
    updateRow: async (_parent: undefined, args: Row) => {
      return await rowModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteRow: async (_parent: undefined, args: Row) => {
      return await rowModel.findByIdAndDelete(args.id);
    },
  },
};
