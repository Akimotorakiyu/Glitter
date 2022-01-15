import { ShrioFragment } from '..'
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
): IFunctionComponent<P & ShrioProps & Record<string, unknown>> => {
  return view
}
