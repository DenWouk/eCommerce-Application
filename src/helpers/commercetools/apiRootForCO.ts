import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getConfig from 'next/config';
import getClient from '@/src/helpers/commercetools/getClient';

const {
  SCOPE_CO = '',
  CLIENT_ID_CO = '',
  CLIENT_SECRET_CO = '',
  PROJECT_KEY = '',
} = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

const scopes = SCOPE_CO.split(' ');

function getApiRootForCO() {
  const client = getClient({
    scopes,
    clientId: CLIENT_ID_CO,
    clientSecret: CLIENT_SECRET_CO,
  });
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
}

export default getApiRootForCO;
