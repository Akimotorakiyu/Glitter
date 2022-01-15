import { IFunctionComponent } from '../createElement/createComponent/componentContext/type'
import { ShrioProps } from './type'

/**
 * for define pure function component
 * @param view
 * @returns
 */
export function defineView<P extends {}>(
  view: IFunctionComponent<P>,
): IFunctionComponent<P & ShrioProps & Record<string, unknown>> {
  return view
}
