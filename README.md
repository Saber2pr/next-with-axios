# @saber2pr/next-with-axios

> axios plugin for nextjs.

```bash
yarn add @saber2pr/next-with-axios
```

```ts
import createAxiosMonad, { fmap } from '@saber2pr/next-with-axios'

const AxiosMonad = createAxiosMonad(async (handler, ctx) => {
  const result: GetServerSidePropsResult<any> = {
    props: {},
  }
  try {
    result.props = await handler(axios, ctx)
  } catch (error) {
    result.props = error
  } finally {
    return result
  }
})

const withRedirect = fmap(withAxios => (handler, ctx) => {
  const url = ctx.req.url
  if (url === '/index') {
    ctx.res.writeHead(302, {
      Location: '/',
    })
    ctx.res.end()
  }
  return withAxios(handler)(ctx)
})

const withAxios = withRedirect(AxiosMonad)

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  const id = ctx.query.id
  const apiRes = await get('xxx', {
    params: { id },
  })
  return {
    data: apiRes.data,
  }
})
```

> Author: saber2pr
