import app from "./app"
import router from "./modules/router"
import smoothscroll from "./modules/smoothscroll"
import { listen } from "quicklink"
import { add, on, size } from "@selfaware/martha"
import gsap from "gsap"
import { primaryInput } from "detect-it"

function resize() {
  app.emit("resize", size())
}

if (primaryInput === "touch") {
  add(document.body, "is-touch")
}

// Broadcast window resize events
on(window, "resize", resize)

// Setup global raf loop
gsap.ticker.add(() => app.emit("tick"))

// Mount picoapp
app.mount()

// Propagate an initial resize event
resize()
// Prefetch links on hover
listen()
// Activate smooth scrolling from locomotive
smoothscroll()

// Listen for page transitions and mount new components
router.on("NAVIGATE_IN", () => {
  app.unmount()
  app.mount()
  resize()
})
