import mongoose from 'mongoose';
import {PalletSpot} from '../../interfaces/PalletSpot';

const palletSpotModel = new mongoose.Schema<PalletSpot>({
  row: {
    type: Number,
    required: true,
    unique: false,
  },
  gap: {
    type: Number,
    required: true,
    unique: false,
  },
  spot: {
    type: Number,
    required: true,
    unique: false,
  },
  pallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pallet',
    required: false,
  },
  shelf: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<PalletSpot>('PalletSpot', palletSpotModel);
