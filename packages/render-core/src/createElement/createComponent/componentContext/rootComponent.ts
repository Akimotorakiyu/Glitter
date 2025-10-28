import { IFunctionComponent, IGlitterNode } from '@glitter/core'

export const FakeRootComponent: IFunctionComponent = () =>
  new Text('<This is root!>') as unknown as IGlitterNode
