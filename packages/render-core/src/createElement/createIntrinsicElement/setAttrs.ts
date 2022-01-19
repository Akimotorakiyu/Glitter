import { convertObjectToAttrStringArray, kebabCase } from './util'
import { TClassType } from './type'

export const setAttrs = (
  shrioNode: IShrioNode,
  newProps: Record<string, any>,
  oldProps: Record<string, any>,
) => {
  const newPropsKeys = Object.keys(newProps)

  const element = shrioNode as unknown as HTMLElement

  Object.keys(oldProps).forEach((key) => {
    if (!newPropsKeys.includes(key)) {
      element.removeAttribute(key)
    }
  })

  Object.entries(newProps).forEach(([key, value]) => {
    if (oldProps[key] !== value) {
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
    }
  })
}
