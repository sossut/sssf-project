import mongoose from 'mongoose';
import {PalletSpot} from '../../interfaces/PalletSpot';

const palletSpotModel = new mongoose.Schema<PalletSpot>({
  row: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Row',
    required: true,
  },
  gap: {
    type: Number,
    required: true,
  },
  spot: {
    type: Number,
    required: true,
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
  disabled: {
    type: Boolean,
    default: false,
  },
});
palletSpotModel.index({row: 1, gap: 1, spot: 1}, {unique: true});
export default mongoose.model<PalletSpot>('PalletSpot', palletSpotModel);
