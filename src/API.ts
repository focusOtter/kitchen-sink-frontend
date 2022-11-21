/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ProductInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  imgKey: string,
  price: number,
  isLive?: boolean | null,
};

export type Product = {
  __typename: "Product",
  id: string,
  name?: string | null,
  description?: string | null,
  price?: number | null,
  isLive?: boolean | null,
  imgKey?: string | null,
};

export type CreateProductMutationVariables = {
  input: ProductInput,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    description?: string | null,
    price?: number | null,
    isLive?: boolean | null,
    imgKey?: string | null,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    description?: string | null,
    price?: number | null,
    isLive?: boolean | null,
    imgKey?: string | null,
  } | null,
};

export type ListProductsQuery = {
  listProducts?:  Array< {
    __typename: "Product",
    id: string,
    name?: string | null,
    description?: string | null,
    price?: number | null,
    isLive?: boolean | null,
    imgKey?: string | null,
  } | null > | null,
};

export type OnProductCreateSubscription = {
  onProductCreate?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    description?: string | null,
    price?: number | null,
    isLive?: boolean | null,
    imgKey?: string | null,
  } | null,
};
