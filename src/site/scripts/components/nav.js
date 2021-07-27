import { on } from "../modules/helpers"
import { component } from "picoapp"
import choozy from "choozy"

export default component((node, ctx) => {
  const { items } = choozy(node)

  items.forEach((element) => {
    on(element, "click", () => alert("something"))
  })
})
