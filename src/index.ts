// by saber2pr 2020/09/04 14:46

import type { AxiosInstance } from 'axios'

import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from 'next'

export interface Props<T = any> {
  [key: string]: T | undefined
}

export interface ParsedUrlQuery extends Props<string | string[]> {}

export type AxiosHandler<P extends Props = Props> = (
  request: AxiosInstance,
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => P | Promise<P>

export type withAxios = <P>(handler: AxiosHandler<P>) => GetServerSideProps<P>

export type handleCtx = <P>(
  handler: AxiosHandler<P>,
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => Promise<GetServerSidePropsResult<P>>

export const createWithAxios = (handleCtx: handleCtx): withAxios => (
  handler
) => async (ctx) => handleCtx(handler, ctx)

export default createWithAxios
