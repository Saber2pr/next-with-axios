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

const withRedirect = fmap((withAxios) => (handler, ctx) => {
  const url = ctx.req.url
  if (url === '/index') {
    ctx.res.writeHead(302, {
      Location: '/',
    })
    ctx.res.end()
  }
  return withAxios(handler)(ctx)
})(AxiosMonad)
```

> Author: saber2pr
