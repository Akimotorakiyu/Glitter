import { useUpdater } from '@shrio/tsx'

const Clock = () => {
  const updater = useUpdater()
  const random0To255 = () => {
    return Math.floor(Math.random() * 255)
      .toString(16)
      .padStart(2, '0')
  }

  const hexColor = () => {
    return `#${random0To255()}${random0To255()}${random0To255()}${random0To255()}`
  }

  setInterval(() => {
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

export function UserCard(props: { name: string; age: number }) {
  return (
    <div>
      <h3>{props.name}</h3>
      <h6>{props.age}</h6>
    </div>
  )
}

export function User() {
  const user = {
    name: '湫曗',
    age: 18,
  }

  const updater = useUpdater()

  return {
    render() {
      return (
        <div>
          <UserCard name={user.name} age={user.age}></UserCard>
          <button
            onclick={() => {
              user.age++
              updater()
            }}
          >
            ++
          </button>
        </div>
      )
    },
  }
}

export function Welcome(...args: unknown[]) {
  return (
    <>
      <h2>hello world</h2>
      <User></User>
      <Clock></Clock>
    </>
  )
}
