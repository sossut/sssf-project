import {Document, Types} from 'mongoose';
import {Gap} from './Gap';
import {Pallet} from './Pallet';
import {Row} from './Row';
import {Spot} from './Spot';

interface PalletSpot extends Document {
  row: Types.ObjectId | Row;
  gap: Types.ObjectId | Gap;
  spot: Types.ObjectId | Spot;
  pallet: Types.ObjectId | Pallet;
  shelf: boolean;
  disabled: boolean;
}

export {PalletSpot};
