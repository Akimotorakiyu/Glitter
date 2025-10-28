import { match, compile, MatchFunction } from 'path-to-regexp'
import { glitterReactive } from '@glitter/glitter'

export interface IRouterInfo {
  path: string
  data?: (...args: any[]) => Record<string, string>
  children: TNamedRouterInfo
}

export type TNamedRouterInfo = Record<string, IRouterInfo>

export type TPickReturnValue<F> = F extends (
  ...args: any[]
) => Record<string, string>
  ? ReturnType<F>
  : {}

export type TRouter<T extends IRouterInfo> = {
  path: T['path']
  fullPath: string
  children: TNamedRouter<T['children']>
  matched: ReturnType<MatchFunction<TPickReturnValue<T['data']>>>
  push: (p: TPickReturnValue<T['data']>) => void
}

export type TNamedRouter<T extends TNamedRouterInfo> = {
  [key in keyof T]: TRouter<T[key]>
}

export function defineRouterInfo<T extends TNamedRouterInfo>(routerConfig: T) {
  return routerConfig
}

export function toRouter<T extends TNamedRouterInfo>(
  routerConfig: T,
  routerHistory: IHistory,
  path: string[],
) {
  const router = {} as TNamedRouter<T>
  Object.entries(routerConfig).forEach(([key, value]) => {
    if (value.path.startsWith('/') || value.path.endsWith('/')) {
      throw new Error("path should'nt start or end with slash - /")
    }
    const curPath = value.path ? path.concat(value.path) : path
    const fullPath = '/' + curPath.join('/')

    const matcher = match(fullPath)
    const compiler = compile(fullPath)

    Reflect.set(router, key, {
      path: value.path,
      fullPath,
      children: toRouter(value.children, routerHistory, path),
      get matched() {
        const result = matcher(routerHistory.path)
        return result
      },
      push(data: Record<string, string>) {
        if (matcher(routerHistory.path)) {
          return
        }
        const realPath = compiler(data)
        console.log(realPath, location)
        history.pushState(data, '', location.origin + realPath)
        routerHistory.path = realPath
      },
    })
  })

  return router
}

interface IHistory {
  path: string
}

export function defineRouter<T extends TNamedRouterInfo>(routerConfig: T) {
  const routerHistory: IHistory = glitterReactive({
    path: location.pathname,
  })

  const router = glitterReactive({
    history: routerHistory,
    router: toRouter(routerConfig, routerHistory, []),
  })

  return router
}
