import { component } from "picoapp"
import { Renderer, Camera } from "ogl"
import choozy from "choozy"
import World from "@/modules/world"

export default component((node, ctx) => {
  const { canvas } = choozy(node)

  function calculateSize() {
    const fov = camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * camera.position.z
    const width = height * camera.aspect
    console.log(width, height)

    return { width, height }
  }

  // Create renderer
  const renderer = new Renderer({
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
    canvas: canvas,
  })
  const gl = renderer.gl
  gl.clearColor(0.97, 0.97, 0.97, 0)

  camera = new Camera(gl, { fov: 45 })
  camera.position.set(0, 0, 4)
  camera.lookAt([0, 0, 0])

  const world = new World({ ...renderer, size: calculateSize() })

  ctx.on("resize", ({ ww, wh }) => {
    renderer.setSize(ww, wh)
    camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })

    world.setSize(calculateSize())
  })
  ctx.on("tick", () => {
    world.update()
    renderer.render({ scene: world.scene, camera })
  })
})
