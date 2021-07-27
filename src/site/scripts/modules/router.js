import Highway from "@dogstudio/highway"
import DefaultTransition from "./transitions/DefaultTransition"

const router = new Highway.Core({
  renderers: {},
  transitions: {
    default: DefaultTransition,
  },
})

export default router
