import {
  defineStateSuite,
  Context,
  KeyType,
  IStateSuite,
  shrioReactive,
} from '@shrio/shrio'

export interface IRadioSuiteProps<T> {
  defaultValue?: T
  onchange?: (value?: T) => void
}

export interface IRadioSuiteState<T> {
  props: IRadioSuiteProps<T>
  value: T | undefined
  reactive: {
    value: T | undefined
  }
}

export const getTypedRadioSuite = <T>(
  defaultValue?: T,
  key?: KeyType,
): IStateSuite<IRadioSuiteProps<T>, IRadioSuiteState<T>> => {
  const state = (
    props: IRadioSuiteProps<T>,
    children: Node[],
    context: Context,
  ) => {
    const state = {
      props,
      value: props.defaultValue,

      reactive: shrioReactive({
        value: props.defaultValue,
      }),
    }

    return state
  }

  const radioSuite = defineStateSuite(state, defaultValue, key)

  return radioSuite
}
