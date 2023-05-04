// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import {TestRow} from '../src/interfaces/Row';

const postRow = async (
  url: string | Function,
  newRow: TestRow,
  token: string
): Promise<TestRow> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation {
          createRow(rowNumber: ${newRow.rowNumber}, gaps: ${newRow.gaps}) {
            id
            rowNumber
            gaps
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const row = res.body.data.createRow as TestRow;
          expect(row.rowNumber).toBe(newRow.rowNumber);
          resolve(row);
        }
      });
  });
};

const getRow = async (
  url: string | Function,
  rowId: string
): Promise<TestRow> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query Query($rowByIdId: ID!) {
          rowById(id: $rowByIdId) {
            id
            rowNumber
            gaps
          }
        }`,
        variables: {
          rowByIdId: rowId,
        },
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const row = res.body.data.rowById as TestRow;
          expect(row.id).toBe(rowId);
          resolve(row);
        }
      });
  });
};

const getRows = async (url: string | Function): Promise<TestRow[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          rows {
            id
            rowNumber
            gaps
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const rows = res.body.data.rows as TestRow[];
          resolve(rows);
        }
      });
  });
};

export {postRow, getRow, getRows};
