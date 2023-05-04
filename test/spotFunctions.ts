// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import {TestSpot} from '../src/interfaces/Spot';

const postSpot = async (
  url: string | Function,
  newSpot: TestSpot,
  token: string
): Promise<TestSpot> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation {
          createSpot(spotNumber: ${newSpot.spotNumber}, gap: "${newSpot.gap}") {
            id
            spotNumber
            gap {
              id
              gapNumber
              spots
              row {
                id
                rowNumber
                gaps
              }
            }
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const spot = res.body.data.createSpot as TestSpot;
          expect(spot.spotNumber).toBe(newSpot.spotNumber);
          expect(spot.gap).toHaveProperty('id');
          resolve(spot);
        }
      });
  });
};

const getSpot = async (
  url: string | Function,
  spotId: string
): Promise<TestSpot> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query SpotById($spotByIdId: ID!) {
          spotById(id: $spotByIdId) {
            spotNumber
            id
            gap {
              gapNumber
              row {
                rowNumber
              }
            }
          }
        }`,
        variables: {
          spotByIdId: spotId,
        },
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const spot = res.body.data.spotById as TestSpot;
          console.log(spot);
          expect(spot.id).toBe(spotId);
          expect(spot.spotNumber).toBe(1);
          expect(spot.gap).toHaveProperty('gapNumber');
          expect(spot.gap).toHaveProperty('row');
          resolve(spot);
        }
      });
  });
};

const getSpots = async (url: string | Function): Promise<TestSpot[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          spots {
            id
            spotNumber
            gap {
              id
              gapNumber
              spots
              row {
                id
                rowNumber
                gaps
              }
            }
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const spots = res.body.data.spots as TestSpot[];
          resolve(spots);
        }
      });
  });
};

export {postSpot, getSpot, getSpots};
