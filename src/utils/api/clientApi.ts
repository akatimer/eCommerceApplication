// import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
  ProductProjectionPagedQueryResponse,
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

export const getProducts = async (
  sortMethod: string
): Promise<void | ClientResponse<ProductProjectionPagedQueryResponse>> => {
  const products = await getApiRoot()
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs: { sort: sortMethod },
    })
    .execute()
    .catch(console.error);
  return products;
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
