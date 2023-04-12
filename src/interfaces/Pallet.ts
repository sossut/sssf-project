import {Document, Types} from 'mongoose';
import {Product} from './Product';

interface Pallet extends Document {
  products: Array<Types.ObjectId> | Array<Product>;
  arrival: Date;
  lastModified: Date;
}

export {Pallet};
