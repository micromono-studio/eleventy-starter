import { component } from "picoapp"
import { Renderer, Geometry, Program, Mesh } from "ogl"
import { vertex, fragment } from "./../shaders/scene.glslx"
import choozy from "choozy"

export default component((node, ctx) => {
  const { canvas } = choozy(node)

  // Create renderer
  const renderer = new Renderer({
    width: window.innerWidth,
    height: window.innerHeight,
    canvas: canvas,
  })
  const gl = renderer.gl

  const geometry = new Geometry(gl, {
    position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
  })
  // Alternatively, you could use the Triangle class.

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: 0 },
    },
  })

  const mesh = new Mesh(gl, { geometry, program: program })

  ctx.on("resize", ({ ww, wh }) => renderer.setSize(ww, wh))
  ctx.on("tick", () => {
    program.uniforms.uTime.value = performance.now() * 0.001
    renderer.render({ scene: mesh })
  })
})
