import mongoose from 'mongoose';
import {Spot} from '../../interfaces/Spot';

const spotModel = new mongoose.Schema<Spot>({
  spotNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  gap: {
    type: mongoose.Types.ObjectId,
    ref: 'Gap',
    required: true,
  },
});
spotModel.index({gap: 1, spotNumber: 1}, {unique: true});
export default mongoose.model<Spot>('Spot', spotModel);
