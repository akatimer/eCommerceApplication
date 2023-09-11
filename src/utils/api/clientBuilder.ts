import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  TokenCache,
  TokenStore,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { LS_LOGIN, TOKEN_NAME } from '../constants';

const MyTokenCache: TokenCache = {
  get() {
    return {
      token: TOKEN_NAME,
      expirationTime: 123,
    };
  },
  set(value: TokenStore) {
    localStorage.setItem(TOKEN_NAME, `${value.token}`);
  },
};

export const projectKey = import.meta.env.VITE_PROJECT_KEY || '';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL || '',
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
  },
  scopes: [import.meta.env.VITE_SCOPES || ''],
  fetch,
};

const anonymMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL || '',
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
  },
  scopes: [import.meta.env.VITE_SCOPES || ''],
  fetch,
  tokenCache: MyTokenCache,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_API_URL || '',
  includeResponseHeaders: true,
  fetch,
};

const client: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const anonymClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(anonymMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getMainApiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};

export const getApiAnonymRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(anonymClient);
};

export const apiTokenRoot = (currentToken: string): ApiRoot => {
  return createApiBuilderFromCtpClient(createClientWithToken(`Bearer ${currentToken}`));
};

export const getApiRoot: () => ApiRoot = () => {
  const currentLoginStatus = localStorage.getItem(LS_LOGIN);
  const tokenStatus = localStorage.getItem(TOKEN_NAME);
  if (currentLoginStatus || tokenStatus) {
    return createApiBuilderFromCtpClient(
      createClientWithToken(`Bearer ${localStorage.getItem(TOKEN_NAME)}`)
    );
  } else {
    return createApiBuilderFromCtpClient(anonymClient);
  }
};

const createPassOptions = (login: string, pass: string): PasswordAuthMiddlewareOptions => {
  const options: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_AUTH_URL || '',
    projectKey: projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
      user: {
        username: login,
        password: pass,
      },
    },
    scopes: [import.meta.env.VITE_SCOPES || ''],
    tokenCache: MyTokenCache,
    fetch,
  };
  return options;
};

export const createClientWithPass = (login: string, pass: string): Client => {
  const clientPass = new ClientBuilder()
    .withPasswordFlow(createPassOptions(login, pass))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return clientPass;
};

export const createClientWithToken = (
  token: string,
  options = {
    force: true,
  }
): Client => {
  // const refreshOptions: RefreshAuthMiddlewareOptions = {
  //   host: import.meta.env.VITE_AUTH_URL || '',
  //   projectKey: projectKey,
  //   credentials: {
  //     clientId: import.meta.env.VITE_CLIENT_ID || '',
  //     clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
  //   },
  //   refreshToken: token,
  //   // tokenCache: MyTokenCache,
  // };
  const clientWithToken = new ClientBuilder()
    .withExistingTokenFlow(token, options)
    // .withRefreshTokenFlow(refreshOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return clientWithToken;
};
