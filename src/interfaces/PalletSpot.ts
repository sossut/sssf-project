import {Document, Types} from 'mongoose';
import {Pallet} from './Pallet';
import {Row} from './Row';
import {Spot} from './Spot';

interface PalletSpot extends Document {
  row: Types.ObjectId | Row;
  gap: number;
  spot: Types.ObjectId | Spot;
  pallet: Types.ObjectId | Pallet;
  shelf: boolean;
  disabled: boolean;
}

export {PalletSpot};
