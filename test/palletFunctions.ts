// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import {TestPallet} from '../src/interfaces/Pallet';

const postPallet = async (
  url: string | Function,
  newPallet: TestPallet,
  token: string
): Promise<TestPallet> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreatePallet($products: [ID]!) {
          createPallet(products: $products) {
            id
            products {
              id
              code
            }
          }
        }`,
        variables: {
          products: newPallet.products,
        },
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log('pallettttti', res.body);
          const pallet = res.body.data.createPallet as TestPallet;
          console.log(pallet);
          expect(pallet.products).toBe(newPallet.products);
          expect(pallet.arrival).toBe(newPallet.arrival);
          expect(pallet.lastModified).toBe(newPallet.lastModified);
          resolve(pallet);
        }
      });
  });
};

const getPallet = async (
  url: string | Function,
  palletId: string
): Promise<TestPallet> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          pallet(id: "${palletId}") {
            id
            products
            arrival
            lastModified
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const pallet = res.body.data.pallet as TestPallet;
          expect(pallet.id).toBe(palletId);
          resolve(pallet);
        }
      });
  });
};

const getPallets = async (
  url: string | Function
): Promise<Array<TestPallet>> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          pallets {
            id
            products
            arrival
            lastModified
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const pallets = res.body.data.pallets as Array<TestPallet>;
          resolve(pallets);
        }
      });
  });
};

const deletePallet = async (
  url: string | Function,
  palletId: string,
  token: string
): Promise<TestPallet> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation {
          deletePallet(id: "${palletId}") {
            id
            products
            arrival
            lastModified
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const pallet = res.body.data.deletePallet as TestPallet;
          expect(pallet.id).toBe(palletId);
          resolve(pallet);
        }
      });
  });
};

const updatePallet = async (
  url: string | Function,
  palletId: string,
  newPallet: TestPallet,
  token: string
): Promise<TestPallet> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation {
          updatePallet(id: "${palletId}", products: ${newPallet.products}) {
            id
            products
            arrival
            lastModified
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const pallet = res.body.data.updatePallet as TestPallet;
          expect(pallet.id).toBe(palletId);
          expect(pallet.products).toBe(newPallet.products);
          resolve(pallet);
        }
      });
  });
};

export {postPallet, getPallet, getPallets, deletePallet, updatePallet};
