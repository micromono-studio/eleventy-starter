import { Text, Texture, Program, Mesh, Geometry } from "ogl"
import WorldItem from "@/modules/world/world-item"

export default class HeroTitle extends WorldItem {
  constructor(props) {
    super(props)
    this.loadFont().then(() => {
      this.createGeometry()
      this.createTexture()
      this.createProgram()
      this.createMesh()

      this.setPosition()
      this.addToScene(this.mesh)
      this.resize()
    })
  }

  async loadFont() {
    const response = await fetch(
      "/assets/webgl-fonts/HelveticaNowDisplay-Medium.json"
    )
    this.font = await response.json()
    return this.font
  }

  createGeometry() {
    this.text = new Text({
      font: this.font,
      text: "A selection of work I'm proud of.",
      align: "center",
      width: this.world.size.width,
      letterSpacing: -0.05,
      size: 0.75,
      lineHeight: 0.9,
    })

    this.geometry = new Geometry(this.gl, {
      position: { size: 3, data: this.text.buffers.position },
      uv: { size: 2, data: this.text.buffers.uv },
      // id provides a per-character index, for effects that may require it
      id: { size: 1, data: this.text.buffers.id },
      index: { data: this.text.buffers.index },
    })
  }
  createTexture() {
    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
    })
    const img = new Image()
    img.onload = () => (this.texture.image = img)
    img.src = "assets/webgl-fonts/HelveticaNowDisplay-Medium.png"
  }
  createProgram() {
    this.program = new Program(this.gl, {
      // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
      vertex: this.renderer.isWebgl2 ? vertex300 : vertex100,
      fragment: this.renderer.isWebgl2 ? fragment300 : fragment100,
      uniforms: {
        tMap: { value: this.texture },
        uTime: { value: 0 },
      },
      transparent: true,
      cullFace: null,
      depthWrite: false,
    })
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })
  }

  setPosition() {
    this.mesh.position.y = this.text.height * 0.5 * (1 / this.mesh.scale.x)
  }

  setSize() {
    const size = this.world.size.width / this.text.width
    const padding = 0.1
    this.mesh.scale.set(size - padding)
  }

  update() {
    if (this.program) {
      this.program.uniforms.uTime.value = performance.now()
    }
  }
  resize() {
    if (!this.mesh) return
    console.log(this.mesh)
    this.setSize()
    this.setPosition()
  }
}

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;

varying vec2 vUv;

void main() {
    vUv = uv;

    vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
    // newPosition.y *= sin(position.x + (uTime * 0.001));
    // newPosition.y *= cos(position.y + (uTime * 0.001));
    newPosition.z *= sin(position.x + (uTime * 0.001)) * .5 - 1.0;
    newPosition.z *= cos(position.y + (uTime * 0.001)) * .5 - 1.0;
    
    gl_Position = projectionMatrix * newPosition;
}
`

const fragment = /* glsl */ `
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
    vec3 tex = texture2D(tMap, vUv).rgb;
    float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
    float d = fwidth(signedDist);
    float alpha = smoothstep(-d, d, signedDist);

    if (alpha < 0.01) discard;

    gl_FragColor.rgb = vec3(0.0);
    gl_FragColor.a = alpha;
}
`

const vertex100 =
  /* glsl */ `
` + vertex

const fragment100 =
  /* glsl */ `#extension GL_OES_standard_derivatives : enable
precision highp float;
` + fragment

const vertex300 =
  /* glsl */ `#version 300 es
#define attribute in
#define varying out
` + vertex

const fragment300 =
  /* glsl */ `#version 300 es
precision highp float;
#define varying in
#define texture2D texture
#define gl_FragColor FragColor
out vec4 FragColor;
` + fragment
