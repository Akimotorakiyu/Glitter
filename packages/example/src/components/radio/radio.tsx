import { defineView, IStateSuite } from '@shiro/create-element'
import { getTypedRadioSuite, IRadioSuiteProps, IRadioSuiteState } from './state'
import { TextView } from '../text'
const key = Symbol('xxxxx')

export const RadioView = defineView(
  <T extends unknown>(props: {
    value: T
    suit?: IStateSuite<IRadioSuiteProps<T>, IRadioSuiteState<T>>
    label: string
    onchange?: (value?: T) => void
  }) => {
    const state = (
      props.suit ?? getTypedRadioSuite<T>(undefined, key)
    ).portal.inject()

    return (
      <label
        onclick={() => {
          state.value = props.value
          state.reactive.value = props.value
          state.props.onchange?.(state.value)
        }}
      >
        <TextView class="mx-1">
          <span
            class={`mx-1 w-4 h-4 rounded-full outline-none border-none hover:shadow ${
              state.reactive.value === props.value
                ? 'bg-red-200'
                : 'bg-blue-200'
            } inline-block`}
          ></span>

          {props.label}
        </TextView>
      </label>
    )
  },
)
