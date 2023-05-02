import mongoose from 'mongoose';
import {Row} from '../../interfaces/Row';

const rowModel = new mongoose.Schema<Row>({
  rowNumber: {
    unique: true,
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  gaps: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
});

export default mongoose.model<Row>('Row', rowModel);
