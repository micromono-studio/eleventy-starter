import { on } from "./Helpers"

export default function (app) {
  on(window, "resize", () =>
    app.emit("viewport:resize", {
      width: window.innerWidth,
      height: window.innerHeight,
    })
  )

  on(window, "mouseenter", ({ clientX: x, clientY: y }) =>
    app.emit("viewport:mouseenter", { x, y })
  )
  on(window, "mousemove", ({ clientX: x, clientY: y }) =>
    app.emit("viewport:mousemove", { x, y })
  )
  on(window, "mouseleave", ({ clientX: x, clientY: y }) =>
    app.emit("viewport:mouseleave", { x, y })
  )

  on(window, "touchstart", ({ changedTouches }) =>
    app.emit("viewport:touchstart", {
      touches: changedTouches.map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      })),
    })
  )
  on(window, "touchmove", ({ changedTouches }) =>
    app.emit("viewport:touchmove", {
      touches: changedTouches.map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      })),
    })
  )
  on(window, "touchend", ({ changedTouches }) =>
    app.emit("viewport:touchend", {
      touches: changedTouches.map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      })),
    })
  )

  on(window, "click", ({ clientX: x, clientY: y, currentTarget: target }) =>
    app.emit("viewport:click", { x, y, target })
  )
}
