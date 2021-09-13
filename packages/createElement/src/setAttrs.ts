import { convertObjectToAttrStringArray, kebabCase } from './tool'
import { TClassType } from './type'

export const setAttrs = (element: HTMLElement, attrs: object) => {
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      // 防止修改原生的函数
      if (
        typeof element[key as keyof (HTMLElement | SVGAElement)] === 'function'
      ) {
        console.error('incorrect key', key)
        throw new Error('incorrect key')
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
