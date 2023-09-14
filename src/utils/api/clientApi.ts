// import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  Cart,
  CartPagedQueryResponse,
  CategoryPagedQueryResponse,
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
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
  console.log(creationResponse);
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

// export const getCustomers = await getApiRoot()
//   .withProjectKey({ projectKey })
//   // .products()
//   // .get()
//   // .execute();
//   .customers()
//   .post({
//     body: {
//       email: 'timur@test.com',
//       password: 'testpass',
//       firstName: 'Timur',
//       lastName: 'Mudryi',
//       dateOfBirth: '1988-02-27',
//       addresses: [
//         {
//           country: 'US',
//           city: 'New York',
//           streetName: '17 State Street',
//           postalCode: '10004',
//           phone: '0000000000',
//         },
//       ],
//       defaultBillingAddress: 0,
//       defaultShippingAddress: 0,
//     },
//   })
//   .execute();

// const getApiPassRoot: () => ApiRoot = () => {
//   return createApiBuilderFromCtpClient(createClientWithPass('timur@test.test.com', 'testpass'));
// };

// export const getMeWithPassResponse = await getApiPassRoot()
//   .withProjectKey({ projectKey })
//   // .products()
//   // .get()
//   // .execute();
//   .me()
//   .delete({
//     queryArgs: {
//       version: 1,
//     },
//   })
//   // .get()
//   // .login()
//   // .post({
//   //   body: {
//   //     email: 'test@test.com',
//   //     password: 'cvsy09oq',
//   //   },
//   //   })
//   // .get()
//   .execute()
//   .catch(console.error);

// const getApiTokenRoot: () => ApiRoot = () => {
//   const currentToket = `Bearer ${localStorage.getItem('token')}`;
//   return createApiBuilderFromCtpClient(createClientWithToken(currentToket));
// };

// export const getMeWithToken = await getApiTokenRoot()
//   .withProjectKey({ projectKey })
//   .me()
//   .get()
//   .execute();
