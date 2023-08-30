/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next/types';
import { getToken, JWT } from 'next-auth/jwt';

export type GetServerSidePropsWithToken<
  Props extends { [key: string]: any } = { [key: string]: any },
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Params, Preview> & { token: JWT | null }
) => Promise<GetServerSidePropsResult<Props>>;

export function ssrWithAuthToken<
  Props extends { [key: string]: any } = { [key: string]: any },
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
>(
  getServerSideProps: GetServerSidePropsWithToken<Props, Params, Preview>
): GetServerSideProps<Props, Params, Preview> {
  return async (ctx) => {
    const token = await getToken({ req: ctx.req });
    const newCtx = { ...ctx, token };
    return getServerSideProps(newCtx);
  };
}

export function handlerAuthToken<
  Req extends NextApiRequest = NextApiRequest,
  Res extends NextApiResponse = NextApiResponse,
>(
  callback: (req: Req & { token: JWT | null }, res: Res) => Promise<void>
): (req: Req, res: Res) => Promise<void> {
  return async (req, res) => {
    const token = await getToken({ req });
    await callback({ ...req, token }, res);
  };
}
