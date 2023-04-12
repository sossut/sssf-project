import mongoose from 'mongoose';
import {Product} from '../../interfaces/Product';

const productModel = new mongoose.Schema<Product>({
  name: {
    type: String,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<Product>('Product', productModel);
