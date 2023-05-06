import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';
import mongoose from 'mongoose';
import {TestGap} from '../src/interfaces/Gap';
import {TestRow} from '../src/interfaces/Row';
import {TestSpot} from '../src/interfaces/Spot';
import {TestProduct} from '../src/interfaces/Product';
import {TestPallet} from '../src/interfaces/Pallet';
import {TestUser} from '../src/interfaces/User';
import {TestPalletSpot} from '../src/interfaces/PalletSpot';
import {getRow, postRow} from './rowFunctions';
import {getGap, postGap} from './gapFunctions';
import {getSpot, postSpot} from './spotFunctions';
import {deleteProduct, getProduct, postProduct} from './productFunctions';
import {
  deletePallet,
  getPallet,
  postPallet,
  updatePallet,
} from './palletFunctions';
import {postPalletSpot, updatePalletSpot} from './palletSpotFunctions';
import {deleteUser, getUser, loginUser, postUser} from './userFunctions';
import {getNotFound} from './testFunctions';
import LoginMessageResponse from '../src/interfaces/LoginMeesageResponse';

describe('GET /graphql', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  let newRow: TestRow;
  let newGap: TestGap;
  let newSpot: TestSpot;
  let newProduct: TestProduct;
  let newProduct2: TestProduct;
  let newPallet: TestPallet;
  let newPalletSpot: TestPalletSpot;
  let userData: LoginMessageResponse;

  const testUser: TestUser = {
    username: 'testuser',
    password: 'testpassword',
  };

  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

  it('should login the user', async () => {
    userData = await loginUser(
      app,
      testUser.username as string,
      testUser.password as string
    );
  });

  it('token should have id', async () => {
    const dataFromToken = jwt.verify(
      userData.token as string,
      process.env.JWT_SECRET as string
    );
    expect(dataFromToken).toHaveProperty('id');
  });

  const testRow: TestRow = {
    rowNumber: 1,
    gaps: 1,
  };

  it('should create a new row, gap, spot and palletspot', async () => {
    newRow = await postRow(app, testRow, userData.token!);
    const testGap: TestGap = {
      gapNumber: 1,
      row: newRow.id!,
    };
    newGap = await postGap(app, testGap, userData.token!);
    const testSpot: TestSpot = {
      spotNumber: 1,
      gap: newGap.id!,
    };
    newSpot = await postSpot(app, testSpot, userData.token!);
    const testPalletSpot: TestPalletSpot = {
      spot: newSpot.id!,
    };
    newPalletSpot = await postPalletSpot(app, testPalletSpot, userData.token!);
  });

  it('should get the row', async () => {
    await getRow(app, newRow.id!);
  });

  it('should get the gap', async () => {
    await getGap(app, newGap.id!);
  });

  it('should get the spot', async () => {
    await getSpot(app, newSpot.id!);
  });
  //AIKA LOPPU. EI KERKEÄ TEKEMÄÄN LOPPUUN

  const testProduct: TestProduct = {
    name: 'Test Product',
    weight: 1,
    code: 'TP',
  };

  it('should create a new product and pallet with the product', async () => {
    newProduct = await postProduct(app, testProduct, userData.token!);
    console.log(newProduct);
    const testPallet: TestPallet = {
      products: [newProduct.id!],
    };
    newPallet = await postPallet(app, testPallet, userData.token!);
  });

  it('should get the product', async () => {
    await getProduct(app, newProduct.id!);
  });

  it('should get the pallet', async () => {
    await getPallet(app, newPallet.id!);
  });
  const tp2: TestProduct = {
    name: 'Test Product 2',
    weight: 1,
    code: 'TP2',
  };
  it('should create a new preoduct update the pallet', async () => {
    newProduct2 = await postProduct(app, tp2, userData.token!);
    const testPallet: TestPallet = {
      products: [newProduct2.id!],
    };
    await updatePallet(app, newPallet.id!, testPallet, userData.token!);
  });
  it('should update the pallet spot', async () => {
    await updatePalletSpot(app, newPalletSpot.id!, newPallet, userData.token!);
  });

  //TODO
  it('should delete the pallet', async () => {
    await deletePallet(app, newPallet.id!, userData.token!);
  });
  it('should delete the products', async () => {
    await deleteProduct(app, newProduct.id!, userData.token!);
    await deleteProduct(app, newProduct2.id!, userData.token!);
  });
  it('should delete the user', async () => {
    await deleteUser(app, userData.id, userData.token!);
  });
});
