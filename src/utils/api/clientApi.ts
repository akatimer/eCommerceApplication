import {
  Cart,
  CartPagedQueryResponse,
  CategoryPagedQueryResponse,
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
  DiscountCodePagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import {
  // createClientWithPass,
  // createClientWithToken,
  getApiRoot,
  projectKey,
} from './clientBuilder';

export const createCustomer = async (
  body: CustomerDraft
): Promise<void | ClientResponse<CustomerSignInResult>> => {
  const creationResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: body,
    })
    .execute()
    .catch(console.error);
  return creationResponse;
};
export const getCategories = async (
  categoryId: string
): Promise<void | ClientResponse<CategoryPagedQueryResponse>> => {
  const categories = await getApiRoot()
    .withProjectKey({ projectKey })
    .categories()
    .get({
      queryArgs: {
        where: `parent(id="${categoryId}")`,
      },
    })
    .execute()
    .catch(console.error);
  return categories;
};

export const getProducts = async (
  queryArgs: object
): Promise<void | ClientResponse<ProductProjectionPagedSearchResponse>> => {
  const products = await getApiRoot()
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get(queryArgs)
    .execute()
    .catch(console.error);
  return products;
};

export const getCarts = async (): Promise<void | ClientResponse<CartPagedQueryResponse>> => {
  const cartsResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .get()
    .execute()
    .catch(console.error);
  return cartsResponse;
};

export const getCart = async (): Promise<void | ClientResponse<Cart>> => {
  const cartResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .activeCart()
    .get()
    .execute()
    .catch(console.error);
  return cartResponse;
};

export const createCart = async (): Promise<void | ClientResponse<Cart>> => {
  const cartResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute()
    .catch(console.error);
  return cartResponse;
};

export const addLineItem = async (
  productId: string,
  cartId: string,
  cartVersion: number
): Promise<void | ClientResponse<Cart>> => {
  const cartResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId: productId,
            variantId: 1,
            quantity: 1,
          },
        ],
      },
    })
    .execute()
    .catch(console.error);
  return cartResponse;
};

export const removeLineItem = async (
  lineItemId: string,
  productQuantity: number,
  cartId: string,
  cartVersion: number
): Promise<void | ClientResponse<Cart>> => {
  const cartResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: lineItemId,
            quantity: productQuantity,
          },
        ],
      },
    })
    .execute()
    .catch(console.error);
  return cartResponse;
};

export const changeLineItemQuantity = async (
  lineItemId: string,
  productQuantity: number,
  cartId: string,
  cartVersion: number
): Promise<void | ClientResponse<Cart>> => {
  const cartResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: lineItemId,
            quantity: productQuantity,
          },
        ],
      },
    })
    .execute()
    .catch(console.error);
  return cartResponse;
};

export const addPromoCode = async (
  code: string = 'BOGO',
  cartId: string,
  cartVersion: number
): Promise<void | ClientResponse<Cart>> => {
  const cartResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addDiscountCode',
            code: code,
          },
        ],
      },
    })
    .execute()
    .catch(console.error);
  return cartResponse;
};

export const getPromoCodes =
  async (): Promise<void | ClientResponse<DiscountCodePagedQueryResponse>> => {
    const promoCodes = await getApiRoot()
      .withProjectKey({ projectKey })
      .discountCodes()
      .get()
      .execute()
      .catch(console.error);
    return promoCodes;
  };

export const removeCart = async (
  cartId: string,
  cartVersion: number
): Promise<void | ClientResponse<Cart>> => {
  const cartResponse = await getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .delete({ queryArgs: { version: cartVersion } })
    .execute()
    .catch(console.error);
  return cartResponse;
};
