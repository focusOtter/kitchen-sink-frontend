/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      isLive
      imgKey
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts {
    listProducts {
      id
      name
      description
      price
      isLive
      imgKey
    }
  }
`;
