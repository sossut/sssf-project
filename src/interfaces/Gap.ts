import {Document, Types} from 'mongoose';
import {Row} from './Row';

interface Gap extends Document {
  gap: number;
  spots: number;
  row: Types.ObjectId | Row;
}

export {Gap};
