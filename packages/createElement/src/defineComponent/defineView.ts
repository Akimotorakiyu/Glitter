import { IFunctionComponent } from '../createElement/createComponent/componentContext/type'
import { ShrioProps } from './type'

/**
 * for define pure function component
 * @param view
 * @returns
 */
export const defineView = <P extends Record<string, unknown>>(
  view: IFunctionComponent<P>,
): IFunctionComponent<P & ShrioProps> => {
  return view
}
