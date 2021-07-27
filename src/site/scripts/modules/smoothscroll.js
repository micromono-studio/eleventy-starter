import LocomotiveScroll from "locomotive-scroll"

export default function () {
  return new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  })
}
