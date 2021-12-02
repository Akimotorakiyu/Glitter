import {
  IFunctionComponent,
  Context,
} from '../createElement/createComponent/componentContext/type'
import { ShrioProps } from './type'

/**
 * for define pure function component
 * @param view
 * @returns
 */
export const defineView = <P extends {}>(
  view: IFunctionComponent<P>,
  customs?:
    | Partial<P & ShrioProps>
    | ((
        p: P & ShrioProps & Record<string, unknown>,
        children: Node[],
        ctx: Context,
      ) => Partial<P & ShrioProps>),
): IFunctionComponent<P & ShrioProps & Record<string, unknown>> => {
  if (customs) {
    return defineView<P & ShrioProps & Record<string, unknown>>((...args) => {
      args[0] = {
        ...(typeof customs === 'function' ? customs(...args) : customs),
        ...args[0],
      }
      return view(...args)
    })
  } else {
    return view
  }
}
