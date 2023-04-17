import mongoose from 'mongoose';
import {Row} from '../../interfaces/Row';

const rowModel = new mongoose.Schema<Row>({
  row: {
    type: Number,
    required: true,
    unique: true,
  },
  gaps: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Row>('Row', rowModel);
