// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import {TestGap} from '../src/interfaces/Gap';

const postGap = async (
  url: string | Function,
  newGap: TestGap,
  token: string
): Promise<TestGap> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation {
          createGap(gapNumber: ${newGap.gapNumber}, row: "${newGap.row}") {
            id
            gapNumber
            spots
            row {
              id
              rowNumber
              gaps
            }
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const gap = res.body.data.createGap as TestGap;
          expect(gap.gapNumber).toBe(newGap.gapNumber);
          expect(gap.spots).toBe(12);
          resolve(gap);
        }
      });
  });
};

const getGap = async (
  url: string | Function,
  gapId: string
): Promise<TestGap> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query Query($gapByIdId: ID!) {
          gapById(id: $gapByIdId) {
            id
          }
        }`,
        variables: {
          gapByIdId: gapId,
        },
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const gap = res.body.data.gapById as TestGap;
          expect(gap.id).toBe(gapId);
          resolve(gap);
        }
      });
  });
};

const getGaps = async (
  url: string | Function,
  rowId: string
): Promise<TestGap[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          gaps(row: "${rowId}") {
            id
            gapNumber
            spots
            row {
              id
              rowNumber
              gaps
            }
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const gaps = res.body.data.gaps as TestGap[];
          resolve(gaps);
        }
      });
  });
};

export {postGap, getGap, getGaps};
