import mongoose from 'mongoose';
import {PalletSpot} from '../../interfaces/PalletSpot';

const palletSpotModel = new mongoose.Schema<PalletSpot>({
  // row: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Row',
  //   required: true,
  // },
  // gap: {
  //   type: Number,
  //   required: true,
  // },
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  pallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pallet',
    required: false,
    unique: true,
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
// palletSpotModel.index({spot: 1, pallet: 1}, {unique: true});
export default mongoose.model<PalletSpot>('PalletSpot', palletSpotModel);
