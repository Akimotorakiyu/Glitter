import { defineView } from '@shrio/shrio'
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

export const ShopWindowView = defineView(() => {
  const numberRadioSuite = getTypedRadioSuite(0)
  const stringRadioSuite = getTypedRadioSuite('')

  const logger = (value: any) => {
    console.log('value', value)
  }

  return (
    <div>
      <h2 class=" text-center text-xl ">Button</h2>
      <div class="flex justify-center max-w-5xl  p-8 m-auto">
        <ButtonViewLight class=" m-4">Button</ButtonViewLight>
        <ButtonViewBlue class=" m-4">Button</ButtonViewBlue>
        <ButtonViewOrange class=" m-4">Button</ButtonViewOrange>
        <ButtonViewRed class=" m-4">Button</ButtonViewRed>
        <ButtonViewGray class=" m-4">Button</ButtonViewGray>
      </div>
      <h2 class=" text-center text-xl ">Text</h2>
      <div class=" max-w-5xl p-8 m-auto">
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />
          <TextViewBlack>
            A modern vanilla front-end framework, for building UI on the web.
          </TextViewBlack>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />

          <TextViewGray>
            A modern vanilla front-end framework, for building UI on the web.
          </TextViewGray>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />

          <TextViewBlue>
            A modern vanilla front-end framework, for building UI on the web.
          </TextViewBlue>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />

          <TextViewOrange>
            A modern vanilla front-end framework, for building UI on the web.
          </TextViewOrange>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />

          <TextViewGreen>
            A modern vanilla front-end framework, for building UI on the web.
          </TextViewGreen>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />
        </ParagraphView>
        <ParagraphView class="justify-center">
          <ImageView
            src="/laugh.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />

          <TextViewRed>
            A modern vanilla front-end framework, for building UI on the web.{' '}
          </TextViewRed>
          <ImageView
            src="/star.svg"
            alt="netlify"
            class=" inline-block  w-4 h-4"
          />
        </ParagraphView>
      </div>

      <h2 class=" text-center text-xl ">Radio</h2>

      <div class=" max-w-5xl  p-8 m-auto">
        <div class="flex justify-center">
          <RadioView value={666} label="666" onchange={logger}></RadioView>
          <RadioView value="泛影" label="你好" onchange={logger}></RadioView>
          <RadioView value="幻光" label="幻光" onchange={logger}></RadioView>
          <RadioView value={888} label="888" onchange={logger}></RadioView>
        </div>

        <div class="flex justify-center">
          <numberRadioSuite.StateView
            defaultValue={1}
            onchange={logger}
            scope={() => {
              return (
                <div>
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
                </div>
              )
            }}
          ></numberRadioSuite.StateView>
          <stringRadioSuite.StateView
            defaultValue={''}
            onchange={logger}
            scope={() => {
              return (
                <div>
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
                </div>
              )
            }}
          ></stringRadioSuite.StateView>
        </div>
      </div>
    </div>
  )
})
