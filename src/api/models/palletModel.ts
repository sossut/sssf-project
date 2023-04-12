import mongoose from 'mongoose';
import {Pallet} from '../../interfaces/Pallet';

const palletModel = new mongoose.Schema<Pallet>({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  ],
  arrival: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<Pallet>('Pallet', palletModel);
