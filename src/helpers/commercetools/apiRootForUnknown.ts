import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getConfig from 'next/config';
import getClient from '@/src/helpers/commercetools/getClient';

const {
  SCOPE_UNKNOWN = '',
  CLIENT_ID_UNKNOWN = '',
  CLIENT_SECRET_UNKNOWN = '',
  PROJECT_KEY = '',
} = getConfig().serverRuntimeConfig as Record<string, string | undefined>;

const scopes = SCOPE_UNKNOWN.split(' ');

const client = getClient({
  scopes,
  clientId: CLIENT_ID_UNKNOWN,
  clientSecret: CLIENT_SECRET_UNKNOWN,
});
const apiRootForUnknown = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: PROJECT_KEY,
});
export default apiRootForUnknown;
