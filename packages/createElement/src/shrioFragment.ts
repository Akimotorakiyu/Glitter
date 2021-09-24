export class ShrioFragment extends DocumentFragment {
  reMount: ((shrioFragment?: ShrioFragment) => void) | null = null
  reloadChildren: (() => DocumentFragment) | null = null
}
