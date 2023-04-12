import {Document} from 'mongoose';

interface Product extends Document {
  name: string;
  weight: number;
  code: string;
}

export {Product};
