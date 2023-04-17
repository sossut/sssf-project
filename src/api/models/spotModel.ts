import mongoose from 'mongoose';
import {Spot} from '../../interfaces/Spot';

const spotModel = new mongoose.Schema<Spot>({
  spot: {
    type: Number,
    required: true,
  },
  gap: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  shelf: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<Spot>('Spot', spotModel);
