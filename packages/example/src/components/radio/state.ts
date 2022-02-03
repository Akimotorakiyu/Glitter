import {
  defineFactoryComponentStateFactory,
  KeyType,
  IStateFactory,
  glitterReactive,
} from '@glitter/glitter'

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
): IStateFactory<IRadioSuiteProps<T>, IRadioSuiteState<T>> => {
  const state = (
    props: IRadioSuiteProps<T>,
    children: TElementValue[],
    context: Context,
  ) => {
    const state = {
      props,
      value: props.defaultValue,

      reactive: glitterReactive({
        value: props.defaultValue,
      }),
    }

    return state
  }

  const radioSuite = defineFactoryComponentStateFactory(state, key)

  return radioSuite
}
