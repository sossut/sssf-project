import {Document} from 'mongoose';

interface Row extends Document {
  rowNumber: number;
  gaps: number;
}
interface TestRow {
  id?: string;
  rowNumber?: number;
  gaps?: number;
}
export {Row, TestRow};
