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
  axios: AxiosInstance,
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => P | Promise<P>

export type AxiosMonad = <P>(handler: AxiosHandler<P>) => GetServerSideProps<P>

export type AxiosEffect = <P>(
  handler: AxiosHandler<P>,
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => Promise<GetServerSidePropsResult<P>>

export const createAxiosMonad = (
  effect: AxiosEffect
): AxiosMonad => handler => ctx => effect(handler, ctx)

export type JoinAxiosMonad = (AxiosMonad: AxiosMonad) => AxiosEffect

export const fmap = (join: JoinAxiosMonad) => (AxiosMonad: AxiosMonad) =>
  createAxiosMonad(join(AxiosMonad))

export default createAxiosMonad
