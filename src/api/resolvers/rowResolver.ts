import {Gap} from '../../interfaces/Gap';
import {Row} from '../../interfaces/Row';
import rowModel from '../models/rowModel';

export default {
  Gap: {
    row: async (parent: Gap) => {
      return await rowModel.findById(parent.id);
    },
  },
  Mutation: {
    createRow: async (_parent: undefined, args: Row) => {
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
