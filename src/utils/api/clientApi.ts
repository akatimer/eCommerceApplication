import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createClientWithPass, getApiRoot, projectKey } from './clientBuilder';

export const getProject = await getApiRoot()
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

export const getProjectPass = await getApiPassRoot()
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
