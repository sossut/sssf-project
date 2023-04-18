import {Pallet} from '../../interfaces/Pallet';
import {Product} from '../../interfaces/Product';
import productModel from '../models/productModel';

export default {
  Pallet: {
    products: async (parent: Pallet) => {
      return await productModel.findById(parent.products);
    },
  },
  Query: {
    products: async () => {
      return await productModel.find();
    },
    productById: async (_parent: undefined, args: Product) => {
      return await productModel.findById(args.id);
    },
  },
  Mutation: {
    createProduct: async (_parent: undefined, args: Product) => {
      const product = new productModel(args);
      return await product.save();
    },
    updateProduct: async (_parent: undefined, args: Product) => {
      return await productModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteProduct: async (_parent: undefined, args: Product) => {
      return await productModel.findByIdAndDelete(args.id);
    },
  },
};
