"use server";

import { newProductRepository } from "../repositorys/product-repository";
import {
  CreateProductRequest,
  PaginationRequest,
} from "../validations/product-validation";

const productRepository = newProductRepository();
export const createProductAction = async (
  token: string,
  data: CreateProductRequest
) => {
  return await productRepository.createProduct(token, data);
};

export const getProductByIdAction = async (token: string, id: string) => {
  return await productRepository.getProductById(token, id);
};

export const updateProductAction = async (
  token: string,
  id: string,
  data: CreateProductRequest
) => {
  return await productRepository.updateProduct(token, id, data);
};

export const deleteProductAction = async (token: string, id: string) => {
  return await productRepository.deleteProduct(token, id);
};

export const getProductsListAction = async (token: string) => {
  return await productRepository.getProductsList(token);
};

export const getProductsListActionWithQuery = async (
  token: string,
  query?: PaginationRequest
) => {
  return await productRepository.getProductsList(token, query);
};

export const getProductsListActionWithQueryAndToken = async (
  token: string,
  query?: PaginationRequest
) => {
  return await productRepository.getProductsList(token, query);
};
