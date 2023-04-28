import {GraphQLError} from 'graphql';
import {Pallet} from '../../interfaces/Pallet';
import {Product} from '../../interfaces/Product';
import {UserIdWithToken} from '../../interfaces/User';
import productModel from '../models/productModel';

export default {
  Pallet: {
    products: async (parent: Pallet) => {
      console.log(parent.products);
      return await productModel.find({_id: {$in: parent.products}});
    },
  },
  Query: {
    products: async () => {
      return await productModel.find();
    },
    productById: async (_parent: undefined, args: Product) => {
      return await productModel.findById(args.id);
    },
    productByCode: async (_parent: undefined, args: Product) => {
      return await productModel.findOne({code: args.code});
    },
  },
  Mutation: {
    createProduct: async (
      _parent: undefined,
      args: Product,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      const product = new productModel(args);
      return await product.save();
    },
    updateProduct: async (
      _parent: undefined,
      args: Product,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await productModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteProduct: async (
      _parent: undefined,
      args: Product,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      return await productModel.findByIdAndDelete(args.id);
    },
  },
};
