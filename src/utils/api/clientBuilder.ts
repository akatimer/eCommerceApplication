import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  TokenCache,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';

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

export const getApiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};

type PasswordAuthMiddlewareOptions = {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
    user: {
      username: string;
      password: string;
    };
  };
  scopes?: string[];
  tokenCache?: TokenCache;
  oauthUri?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch?: any;
};

const MyTokenCache: TokenCache = {
  get() {
    return {
      token: 'token',
      expirationTime: 123,
    };
  },
  set(value: TokenStore) {
    localStorage.setItem('123', `${value.token}`);
  },
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
