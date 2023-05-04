import {Document, Types} from 'mongoose';
import {Product} from './Product';

interface Pallet extends Document {
  products: Array<Types.ObjectId> | Array<Product>;
  arrival: Date;
  lastModified: Date;
}

interface TestPallet {
  id?: string;
  products?: Array<string>;
  arrival?: Date;
  lastModified?: Date;
}

export {Pallet, TestPallet};
