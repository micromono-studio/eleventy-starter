import { Transform } from "ogl"
import HeroTitle from "./hero-title"

export default class World {
  constructor({ gl, size, ...renderer }) {
    this.childrenUpdating = []
    this.gl = gl
    this.renderer = renderer
    this.setSize(size)
    this.createScene()
    this.createChildren({
      heroTitle: new HeroTitle({ gl: this.gl, world: this }),
    })
  }

  createScene() {
    this.scene = new Transform()
  }
  createChildren(childMap = {}) {
    this.childrenUpdating = []

    for (let key in childMap) {
      const child = childMap[key]
      if (child.update || child.resize) this.childrenUpdating.push(child)
    }

    this.children = childMap
  }

  update() {
    this.childrenUpdating.forEach((c) => c.update?.())
  }

  setSize(size) {
    console.log(size)
    this.size = size
    this.childrenUpdating.forEach((c) => c.resize?.())
  }
}
