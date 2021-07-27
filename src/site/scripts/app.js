import { picoapp } from "picoapp"
import { size } from "@selfaware/martha"

import nav from "./components/nav"
import canvas from "./components/canvas"

const components = {
  nav,
  canvas,
}

const state = {
  ...size(),
}

export default picoapp(components, state)
