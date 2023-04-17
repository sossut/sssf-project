import {Document, Types} from 'mongoose';
import {Pallet} from './Pallet';
import {Row} from './Row';

interface PalletSpot extends Document {
  row: Types.ObjectId | Row;
  gap: number;
  spot: number;
  pallet: Types.ObjectId | Pallet;
  shelf: boolean;
  disabled: boolean;
}

export {PalletSpot};
