import {Document, Types} from 'mongoose';
import {Gap} from './Gap';

interface Spot extends Document {
  spot: number;
  gap: Types.ObjectId | Gap;
  shelf: boolean;
}

export {Spot};
