import { defineView, ViewContext } from '@glitter/glitter'
import {
  ButtonViewLight,
  ButtonViewBlue,
  ButtonViewOrange,
  ButtonViewRed,
  ButtonViewGray,
} from '../../components/index'

import {
  TextViewRed,
  TextViewBlack,
  TextViewBlue,
  TextViewOrange,
  TextViewGray,
  ParagraphView,
  TextViewGreen,
} from '../../components/text'

import { ImageView, getTypedRadioSuite, RadioView } from '../../components'
import { SvgStar } from './svg'

import { htmlElements as h, htsx } from '@glitter/render-dom'
import { Galacean } from './galacean'

function logger<T>(value: T) {
  console.log('value', value)
}

export const ShopWindowView = defineView(() => {
  const numberRadioSuite = getTypedRadioSuite(0)
  const stringRadioSuite = getTypedRadioSuite('')

  return (
    <h.div>
      <h.h2 class="text-xl text-center ">Custom Render</h.h2>
      <h.div class="flex justify-center max-w-5xl p-8 m-auto ">
        <SvgStar></SvgStar>
      </h.div>
      <h.h2 class="text-xl text-center ">Galacean Render</h.h2>
      <h.div class="flex justify-center max-w-5xl p-8 m-auto ">
        <Galacean></Galacean>
      </h.div>
      <h.h2 class="text-xl text-center ">Button</h.h2>
      <h.div class="flex justify-center max-w-5xl p-8 m-auto gap-2">
        <ButtonViewLight class="m-4 ">Button</ButtonViewLight>
        <ButtonViewBlue class="m-4 ">Button</ButtonViewBlue>
        <ButtonViewOrange class="m-4 ">Button</ButtonViewOrange>
        <ButtonViewRed class="m-4 ">Button</ButtonViewRed>
        <ButtonViewGray class="m-4 ">Button</ButtonViewGray>
      </h.div>
      <h.h2 class="text-xl text-center ">Text</h.h2>
      <h.div class="max-w-5xl p-8 m-auto ">
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />
          <TextViewBlack>A modern vanilla mvvm framework</TextViewBlack>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />

          <TextViewGray>A modern vanilla mvvm framework</TextViewGray>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />

          <TextViewBlue>A modern vanilla mvvm framework</TextViewBlue>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />

          <TextViewOrange>A modern vanilla mvvm framework</TextViewOrange>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />

          <TextViewGreen>A modern vanilla mvvm framework</TextViewGreen>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />

          <TextViewRed>A modern vanilla mvvm framework </TextViewRed>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class="inline-block w-4 h-4 "
          />
        </ParagraphView>
      </h.div>

      <h.h2 class="text-xl text-center ">Radio</h.h2>

      <h.div class="max-w-5xl p-8 m-auto ">
        <h.div class="flex justify-center">
          <ViewContext
            componentStateFactoryProto={numberRadioSuite}
            defaultValue={1}
            onchange={logger}
            scope={() => {
              return (
                <h.div>
                  <RadioView
                    value={666}
                    label="666"
                    suit={numberRadioSuite}
                    onchange={logger}
                  ></RadioView>
                  <RadioView
                    value={888}
                    label="888"
                    suit={numberRadioSuite}
                    onchange={logger}
                  ></RadioView>
                </h.div>
              )
            }}
          ></ViewContext>
          <ViewContext
            componentStateFactoryProto={stringRadioSuite}
            defaultValue={''}
            onchange={logger}
            scope={() => {
              return (
                <h.div>
                  <RadioView
                    value={'幻光'}
                    label="幻光"
                    suit={stringRadioSuite}
                    onchange={logger}
                  ></RadioView>
                  <RadioView
                    value={'泛影'}
                    label="泛影"
                    suit={stringRadioSuite}
                    onchange={logger}
                  ></RadioView>
                </h.div>
              )
            }}
          ></ViewContext>
        </h.div>
      </h.div>
    </h.div>
  )
})
