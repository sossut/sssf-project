import mongoose from 'mongoose';
import {Gap} from '../../interfaces/Gap';

const gapModel = new mongoose.Schema<Gap>({
  gapNumber: {
    type: Number,
    required: true,
  },
  spots: {
    type: Number,
    default: 12,
  },
  row: {
    type: mongoose.Types.ObjectId,
    ref: 'Row',
    required: true,
  },
});
gapModel.index({row: 1, gapNumber: 1}, {unique: true});
export default mongoose.model<Gap>('Gap', gapModel);
