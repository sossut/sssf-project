import mongoose from 'mongoose';
import {Gap} from '../../interfaces/Gap';

const gapModel = new mongoose.Schema<Gap>({
  gap: {
    type: Number,
    required: true,
  },
  spots: {
    type: Number,
    required: true,
  },
  row: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model<Gap>('Gap', gapModel);
