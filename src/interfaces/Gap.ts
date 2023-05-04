import {Document, Types} from 'mongoose';
import {Row} from './Row';

interface Gap extends Document {
  gapNumber: number;
  spots: number;
  row: Types.ObjectId | Row;
}

interface TestGap {
  id?: string;
  gapNumber?: number;
  spots?: number;
  row?: string;
}

export {Gap, TestGap};
