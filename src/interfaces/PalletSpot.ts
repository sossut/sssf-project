import {Document, Types} from 'mongoose';
import {Pallet} from './Pallet';

interface PalletSpot extends Document {
  row: number;
  gap: number;
  spot: number;
  pallet: Types.ObjectId | Pallet;
  shelf: boolean;
}

export {PalletSpot};
