import Highway from "@dogstudio/highway"
import gsap from "gsap/gsap-core"

export default class DefaultTransition extends Highway.Transition {
  in({ from, to, done }) {
    gsap.set(to, { autoAlpha: 0 })
    window.scrollTo(0, 0)
    from.remove()
    gsap.to(to, {
      autoAlpha: 1,
      duration: 0.5,
      onComplete: done,
    })
  }
  out({ from, to, done }) {
    gsap.to(from, {
      autoAlpha: 0,
      duration: 0.5,
      onComplete: done,
    })
  }
}
