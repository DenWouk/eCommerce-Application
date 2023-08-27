import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getConfig from 'next/config';
import getClient from '@/src/helpers/commercetools/getClient';
import NamesClients from '@/src/helpers/commercetools/consts';

const {
  SCOPE = '',
  CLIENT_ID = '',
  CLIENT_SECRET = '',
  PROJECT_KEY = '',
} = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

const scopes = SCOPE.split(' ');

const client = getClient(
  {
    scopes,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  { type: NamesClients.ANONYMOUS }
);
const apiRootForUnknown = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: PROJECT_KEY,
});
export default apiRootForUnknown;
