import {Document} from 'mongoose';

interface Row extends Document {
  row: number;
  gaps: number;
}

export {Row};
