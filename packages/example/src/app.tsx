import { useUpdater } from '@shrio/tsx'

const Clock = () => {
  const updater = useUpdater()
  const rendom0To255 = () => {
    return Math.floor(Math.random() * 255).toString(16)
  }

  const hexColor = () => {
    return `#${rendom0To255()}${rendom0To255()}${rendom0To255()}`
  }

  setInterval(() => {
    console.log('update')
    updater()
  }, 1000)
  return {
    render() {
      return (
        <div>
          <h1>你好世界,无 diff 更新实现</h1>
          <h2>{Date()}</h2>
          <div
            style={{
              height: '100px',
              backgroundColor: hexColor(),
              transitionProperty: 'background-color',
              transitionDuration: '1000ms',
              borderRadius: '16px',
            }}
          ></div>
        </div>
      )
    },
  }
}

export function Welcome(...args: unknown[]) {
  console.log('root')
  return (
    <>
      <h2>hello world</h2>
      <Clock></Clock>
    </>
  )
}
