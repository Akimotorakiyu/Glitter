import { markAsFunctionComponent } from '@shrio/core'
import { ShrioProps } from './type'

/**
 * for define pure function component
 * @param view
 * @returns
 */
export function defineView<P extends {}>(
  view: IFunctionComponent<P>,
): IFunctionComponent<P & ShrioProps & Record<string, unknown>> {
  markAsFunctionComponent(view)
  return view
}

export const View = defineView(
  (props: { view: IFunctionComponent<{}> }, children, ctx) => {
    return props.view(props, children, ctx)
  },
)
