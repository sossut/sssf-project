import mongoose from 'mongoose';
import {Row} from '../../interfaces/Row';

const rowModel = new mongoose.Schema<Row>({
  rowNumber: {
    unique: true,
    type: Number,
    required: true,
  },
  gaps: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Row>('Row', rowModel);
