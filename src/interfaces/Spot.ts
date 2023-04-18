import {Document, Types} from 'mongoose';
import {Gap} from './Gap';

interface Spot extends Document {
  spotNumber: number;
  gap: Types.ObjectId | Gap;
}

export {Spot};
