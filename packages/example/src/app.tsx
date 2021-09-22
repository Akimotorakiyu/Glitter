import { useUpdater, dynamic } from '@shrio/tsx'
const Clock = () => {
  const random0To255 = () => {
    return Math.floor(Math.random() * 255)
      .toString(16)
      .padStart(2, '0')
  }

  const hexColor = () => {
    return `#${random0To255()}${random0To255()}${random0To255()}${random0To255()}`
  }

  const updater = useUpdater()
  // setInterval(() => {
  //   updater()
  // }, 1000)

  const randomState = Math.random()

  return {
    render() {
      return (
        <>
          <h1>你好世界,无 diff 更新实现</h1>
          <h2>{Date()}</h2>
          <h3>random state: {randomState} gen by Math.random</h3>
          <button
            onclick={() => {
              updater()
            }}
          >
            manuel update
          </button>
          <div
            style={{
              height: '100px',
              backgroundColor: hexColor(),
              transitionProperty: 'background-color',
              transitionDuration: '1000ms',
              borderRadius: '16px',
            }}
          ></div>
        </>
      )
    },
  }
}

export function Mael(props: { if?: any }) {
  return {
    render() {
      return <div>男性</div>
    },
  }
}
export function Femael(props: { if?: any }) {
  return <div>女性</div>
}

export function UserCard(props: { name: string; age: number }) {
  return (
    <>
      <h3>{props.name}</h3>
      <h6>{props.age}</h6>
      <span if={props.age % 2 === 0}>偶数</span>
      <span if={props.age % 2 === 1}>奇数</span>
      <Mael if={props.age % 2 === 0}></Mael>
      <Femael if={props.age % 2 === 1}></Femael>
    </>
  )
}

export function User(user: { key: string; name: string; age: number }) {
  const updater = useUpdater()

  return {
    render() {
      return (
        <>
          <UserCard name={user.name} age={user.age}></UserCard>
          <button
            onclick={() => {
              user.age++
              updater()
            }}
          >
            ++
          </button>
          <Clock></Clock>
        </>
      )
    },
  }
}

export function Welcome(...args: unknown[]) {
  const users = [
    {
      name: '湫曗',
      age: 18,
      id: 'qiuye',
    },
    {
      name: '星痕',
      age: 19,
      id: 'xinghen',
    },
  ]

  const updater = useUpdater()

  return (
    <div>
      <h2>hello world</h2>
      <button
        onclick={() => {
          updater()
        }}
      >
        fresh
      </button>
      {users
        .filter(() => {
          return Math.random() > 0.5
        })
        .map(
          dynamic((setKey, user) => {
            setKey(user.id)
            // return <div>{user.name}</div>
            return <User {...user} key={user.id}></User>
          }),
        )}
      <p>----------</p>
    </div>
  )
}
