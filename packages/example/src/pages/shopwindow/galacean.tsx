import {
  createRef,
  defineFactoryComponent,
  defineStateFactory,
  htsx,
  onCreated,
  onUpdated,
  useUpdater,
} from '@glitter/glitter'
import { galaceanElements } from '@glitter/render-galacean'
import { htmlElements as h } from '@glitter/render-dom'
import { WebGLEngine, Entity, Camera, Vector3 } from '@galacean/engine'
import { OrbitControl } from '@galacean/engine-toolkit-controls'

const g = galaceanElements

const state = defineStateFactory(() => {
  let engineRef = createRef<WebGLEngine>()
  let canvasRef = createRef<HTMLCanvasElement>()
  let rootEntityRef = createRef<Entity>()
  let entityRef = createRef<Entity>()

  const updater = useUpdater()

  onCreated(async () => {
    if (canvasRef.current) {
      const engine = (engineRef.current = await WebGLEngine.create({
        canvas: canvasRef.current,
      }))

      engine.canvas.resizeByClientSize()
      const scene = engine.sceneManager.activeScene
      rootEntityRef.current = scene.createRootEntity()

      const cameraEntity = rootEntityRef.current.createChild('camera')
      cameraEntity.addComponent(Camera)
      cameraEntity.addComponent(OrbitControl)

      const pos = cameraEntity.transform.position
      pos.set(10, 10, 10)
      cameraEntity.transform.position = pos
      cameraEntity.transform.lookAt(new Vector3(0, 0, 0))

      // init light
      scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1)
      scene.ambientLight.diffuseIntensity = 1.2

      engineRef.current.run()

      updater()
    } else {
      console.log('empty canvas', canvasRef.current)
    }
  })

  onUpdated(() => {
    console.log('onUpdated', rootEntityRef.current, entityRef.current)
    if (rootEntityRef.current && entityRef.current) {
      rootEntityRef.current.addChild(entityRef.current)
    } else {
      console.log('empty entiy', rootEntityRef.current, entityRef.current)
    }
  })

  return {
    engineRef,
    canvasRef,
    entityRef,
    updater,
    rootEntityRef,
  }
})

export const Galacean = defineFactoryComponent(state, (props) => {
  const engineRef = props.engineRef
  const canvasRef = props.canvasRef
  const entityRef = props.entityRef

  console.log(
    'Galacean',
    engineRef.current,
    canvasRef.current,
    entityRef.current,
  )

  if (engineRef.current && !entityRef.current) {
    setTimeout(() => {
      props.updater()
    }, 1000)
  }

  if (engineRef.current && props.rootEntityRef.current && entityRef.current) {
    props.rootEntityRef.current.addChild(entityRef.current)
  }

  const canvas = (
    <h.canvas ref={canvasRef}>
      <g.entity
        ref={entityRef}
        name="cube"
        if={Boolean(engineRef.current)}
        engine={engineRef.current}
      ></g.entity>
    </h.canvas>
  )

  return canvas
})
