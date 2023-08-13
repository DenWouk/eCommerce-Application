import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import getConfig from 'next/config';
import getClient from '@/src/helpers/commercetools/getClient';

const {
  SCOPE_SPA = '',
  CLIENT_ID = '',
  CLIENT_SECRET = '',
  PROJECT_KEY = '',
} = getConfig().publicRuntimeConfig as Record<string, string | undefined>;

const scopes = SCOPE_SPA.split(' ');

function getApiRootForUser(userOrToken?: UserAuthOptions | string) {
  const client = getClient(
    { scopes, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET },
    userOrToken
  );
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
}

export default getApiRootForUser;
