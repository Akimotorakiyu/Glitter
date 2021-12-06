import { definePortal, IPortal } from '..'
import { IFunctionComponent } from '../createElement/createComponent/componentContext/type'
import { ShrioProps, IStateFactory } from './type'

export const defineState = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  state: IStateFactory<P, S>,
): IStateFactory<P, S> => {
  return state
}

export const defineStatePortal = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  state: IStateFactory<P, S>,
): IPortal<S> => {
  const portal = definePortal<S>()
  return portal
}

export const defineStateView = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  stateFactory: IStateFactory<P, S>,
  view: IFunctionComponent<S>,
): IFunctionComponent<S & ShrioProps> => {
  return view
}
