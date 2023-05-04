// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import {TestPalletSpot} from '../src/interfaces/PalletSpot';

const postPalletSpot = async (
  url: string | Function,
  newPalletSpot: TestPalletSpot,
  token: string
): Promise<TestPalletSpot> => {
  console.log(newPalletSpot);
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreatePalletSpot($spot: ID!) {
          createPalletSpot(spot: $spot) {
            id
            spot {
              spotNumber
              id
              gap {
                gapNumber
                id
                row {
                  rowNumber
                  id
                }
              }
            }
          }
        }`,
        variables: {
          spot: newPalletSpot.spot,
        },
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const palletSpot = res.body.data.createPalletSpot as TestPalletSpot;
          expect(palletSpot).toHaveProperty('id');
          expect(palletSpot.spot).toHaveProperty('spotNumber');
          expect(palletSpot.spot).toHaveProperty('id');
          resolve(palletSpot);
        }
      });
  });
};

const getPalletSpot = async (
  url: string | Function,
  palletSpotId: string
): Promise<TestPalletSpot> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          palletSpot(id: "${palletSpotId}") {
            id
            spot {
              spotNumber
              id
              gap {
                gapNumber
                id
                row {
                  rowNumber
                  id
                }
              }
            }
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const palletSpot = res.body.data.palletSpot as TestPalletSpot;
          resolve(palletSpot);
        }
      });
  });
};

const getPalletSpots = async (
  url: string | Function
): Promise<TestPalletSpot[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          palletSpots {
            id
            spot {
              spotNumber
              id
              gap {
                gapNumber
                id
                row {
                  rowNumber
                  id
                }
              }
            }
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const palletSpots = res.body.data.palletSpots as TestPalletSpot[];
          resolve(palletSpots);
        }
      });
  });
};

const updatePalletSpot = async (
  url: string | Function,
  palletSpotId: string,
  newPalletSpot: TestPalletSpot,
  token: string
): Promise<TestPalletSpot> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdatePalletSpot($id: ID!, $spot: ID!) {
          updatePalletSpot(id: $id, spot: $spot) {
            id
            spot {
              spotNumber
              id
              gap {
                gapNumber
                id
                row {
                  rowNumber
                  id
                }
              }
            }
          }
        }`,
        variables: {
          id: palletSpotId,
          spot: newPalletSpot.spot,
        },
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const palletSpot = res.body.data.updatePalletSpot as TestPalletSpot;
          expect(palletSpot.spot).toBe(newPalletSpot.spot);
          resolve(palletSpot);
        }
      });
  });
};

export {postPalletSpot, getPalletSpot, getPalletSpots, updatePalletSpot};
