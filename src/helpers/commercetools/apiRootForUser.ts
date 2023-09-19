import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import getConfig from 'next/config';
import getClient from '@/src/helpers/commercetools/getClient';
import NamesClients from '@/src/helpers/commercetools/consts';

const {
  SCOPE_SPA = '',
  CLIENT_ID = '',
  CLIENT_SECRET = '',
  PROJECT_KEY = '',
} = getConfig().serverRuntimeConfig as Record<string, string | undefined>;

const scopes = SCOPE_SPA.split(' ');

function getApiRootForUser(userOrToken: UserAuthOptions) {
  const client = getClient(
    { scopes, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET },
    { type: NamesClients.PASSWORD, value: userOrToken }
  );
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
}

export default getApiRootForUser;
