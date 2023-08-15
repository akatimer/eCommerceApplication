import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  createClientWithPass,
  createClientWithToken,
  getApiRoot,
  projectKey,
} from './clientBuilder';

export const getCustomers = await getApiRoot()
  .withProjectKey({ projectKey })
  // .products()
  // .get()
  // .execute();
  .customers()
  .get()
  .execute();

const getApiPassRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(
    createClientWithPass('zhiznevskiyartem@gmail.com', 'qweqweqwe')
  );
};

export const getMeWithPassResponse = await getApiPassRoot()
  .withProjectKey({ projectKey })
  // .products()
  // .get()
  // .execute();
  .me()
  // .login()
  // .post({
  //   body: {
  //     email: 'test@test.com',
  //     password: 'cvsy09oq',
  //   },
  //   })
  .get()
  .execute()
  .catch(console.error);

const getApiTokenRoot: () => ApiRoot = () => {
  const currentToket = `Bearer ${localStorage.getItem('token')}`;
  return createApiBuilderFromCtpClient(createClientWithToken(currentToket));
};

export const getMeWithToken = await getApiTokenRoot()
  .withProjectKey({ projectKey })
  .me()
  .get()
  .execute();
