import { defineView, IStateFactory } from '@glitter/glitter'
import { IRadioSuiteProps, IRadioSuiteState } from './state'
import { TextView } from '../text'
import { htmlElements as h, htsx } from '@glitter/render-dom'

export const RadioView = defineView(
  <T extends unknown>(props: {
    value: T
    suit?: IStateFactory<IRadioSuiteProps<T>, IRadioSuiteState<T>>
    label: string
    onchange?: (value?: T) => void
  }) => {
    const state = props.suit!.inject()
    return (
      <h.label
        onclick={() => {
          state.value = props.value
          state.reactive.value = props.value
          state.props.onchange?.(state.value)
        }}
      >
        <TextView class="mx-1">
          <h.span
            class={`mx-1 w-4 h-4 rounded-full outline-none border-none hover:shadow ${
              state.reactive.value === props.value
                ? 'bg-red-200'
                : 'bg-blue-200'
            } inline-block`}
          ></h.span>

          {props.label}
        </TextView>
      </h.label>
    )
  },
)
