import { GetTokenParams, getToken } from 'next-auth/jwt';
import NamesClients from '@/src/helpers/commercetools/consts';

export default async function isAuthorized(tokenParam: GetTokenParams) {
  return (await getToken(tokenParam))?.type === NamesClients.PASSWORD;
}
