// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import {TestProduct} from '../src/interfaces/Product';

const postProduct = async (
  url: string | Function,
  newProduct: TestProduct,
  token: string
): Promise<TestProduct> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateProduct($name: String!, $weight: Float!, $code: String!) {
          createProduct(name: $name, weight: $weight, code: $code) {
            code
            name
            weight
          }
        }`,
        variables: {
          name: newProduct.name,
          weight: newProduct.weight,
          code: newProduct.code,
        },
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log('first', res.body);
          const product = res.body.data.createProduct as TestProduct;
          console.log(product);
          expect(product.name).toBe(newProduct.name);
          expect(product.weight).toBe(newProduct.weight);
          expect(product.code).toBe(newProduct.code);
          resolve(product);
        }
      });
  });
};

const getProduct = async (
  url: string | Function,
  productId: string
): Promise<TestProduct> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          product(id: "${productId}") {
            code
            name
            weight
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const product = res.body.data.product as TestProduct;
          expect(product.id).toBe(productId);
          resolve(product);
        }
      });
  });
};

const getProducts = async (url: string | Function): Promise<TestProduct[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query {
          products {
            code
            name
            weight
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const products = res.body.data.products as TestProduct[];
          resolve(products);
        }
      });
  });
};

const deleteProduct = async (
  url: string | Function,
  productId: string,
  token: string
): Promise<TestProduct> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation {
          deleteProduct(id: "${productId}") {
            code
            name
            weight
          }
        }`,
      })
      .expect(200, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const product = res.body.data.deleteProduct as TestProduct;
          expect(product.id).toBe(productId);
          resolve(product);
        }
      });
  });
};

export {postProduct, getProduct, getProducts, deleteProduct};
