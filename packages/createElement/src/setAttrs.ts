import { convertObjectToAttrStringArray, kebabCase } from './tool'
import { TClassType } from './type'

export const setAttrs = (element: HTMLElement, attrs: object) => {
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key.startsWith('on')) {
        if (typeof value === 'function') {
          Reflect.set(element, key, value)
        } else {
          console.error('incorrect event listener', key, value)
          throw new Error('incorrect event listener')
        }
      }
      // 设置普通属性
      else {
        const tempValue: any = value
        let realValue: string

        // 处理 class
        if (key === 'class' || key === 'className') {
          realValue = [tempValue]
            .flat(Infinity)
            .map((item: TClassType) => {
              return typeof item === 'object'
                ? convertObjectToAttrStringArray(item)
                : item
            })
            .flat()
            // .map(kebabCase)
            .join(' ')
        }
        // 处理 style
        else if (key === 'style' && typeof tempValue === 'object') {
          realValue = Object.entries(tempValue)
            .map(([key, value]) => {
              return `${kebabCase(key)}:${value}`
            })
            .join(';')
        } else {
          realValue = tempValue
        }
        // 设置普通属性
        element.setAttribute(key, realValue)
      }
    })
  }
}
