export class ShrioFragment extends DocumentFragment {
  reMount: (() => void) | null = null
  reloadChildren: (() => DocumentFragment) | null = null
}
