export default class WorldItem {
  constructor({ gl, world } = {}) {
    this.gl = gl
    this.world = world
    this.renderer = this.world.renderer
    this.scene = this.world.scene
  }

  addToScene(item) {
    if (item.setParent) item.setParent.call(item, this.scene)
  }
}
