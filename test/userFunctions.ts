import bcrypt from 'bcryptjs';
// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import LoginMessageResponse from '../src/interfaces/LoginMeesageResponse';
import {TestUser} from '../src/interfaces/User';

const postUser = (
  url: string | Function,
  user: TestUser
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation CreateUser($username: String!, $password: String!) {
          createUser(username: $username, password: $password) {
            id
            password
            role
            token
            username
          }
        }`,
        variables: {
          username: user.username,
          password: user.password,
        },
      })
      .expect(200, async (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.createUser;

          expect(userData.username).toBe(user.username);

          resolve(response.body.data.createUser);
        }
      });
  });
};

const getUser = async (
  url: string | Function,
  userId: string
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          user(id: "${userId}") {
            id
            username
            password
            token
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const user = res.body.data.user as TestUser;
          expect(user.id).toBe(userId);
          resolve(user);
        }
      });
  });
};

const loginUser = async (
  url: string | Function,
  username: string,
  password: string
): Promise<LoginMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `mutation Login($username: String!, $password: String!) {
          loginUser(username: $username, password: $password) {
            token
            username
            id
          }
        }`,
        variables: {
          username: username,
          password: password,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log('login response', response.body);
          const userData = response.body.data.loginUser;
          console.log(userData);
          expect(userData).toHaveProperty('username');
          expect(userData).toHaveProperty('token');

          expect(userData).toHaveProperty('id');
          resolve(response.body.data.loginUser);
        }
      });
  });
};

const deleteUser = async (
  url: string | Function,
  userId: string,
  token: string
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteUser($id: ID!) {
          deleteUser(id: $id) {
            id
            username
          }
        }`,
        variables: {
          id: userId,
        },
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const user = res.body.data.deleteUser as TestUser;
          expect(user.id).toBe(userId);
          resolve(user);
        }
      });
  });
};

export {postUser, getUser, loginUser, deleteUser};
