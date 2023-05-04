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

interface TestPalletSpot {
  id?: string;
  row?: string;
  gap?: number;
  spot?: string;
  pallet?: string;
  shelf?: boolean;
  disabled?: boolean;
}

export {PalletSpot, TestPalletSpot};
