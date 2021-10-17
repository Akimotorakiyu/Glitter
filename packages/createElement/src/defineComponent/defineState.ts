import { definePortal, IPortal } from '..'
import { IFunctionComponent } from '../createElement/createComponent/componentContext/type'
import { ShrioProps, IFactoryState } from './type'

export const defineState = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  state: IFactoryState<P, S>,
): IFactoryState<P, S> => {
  return state
}

export const defineStatePortal = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  state: IFactoryState<P, S>,
): IPortal<S> => {
  const portal = definePortal<S>()
  return portal
}

export const defineStateView = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  stateFactory: IFactoryState<P, S>,
  view: IFunctionComponent<S>,
): IFunctionComponent<S & ShrioProps> => {
  return view
}
