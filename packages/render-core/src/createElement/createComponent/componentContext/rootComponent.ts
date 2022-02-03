import { defineView } from '@glitter/glitter'
export const FakeRootComponent = defineView(
  () => new Text('<This is root!>') as unknown as IGlitterNode,
)
