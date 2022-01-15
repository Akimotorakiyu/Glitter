import { defineView } from '@shrio/shrio'
export const FakeRootComponent = defineView(
  () => new Text('<This is root!>') as unknown as IShrioNode,
)
