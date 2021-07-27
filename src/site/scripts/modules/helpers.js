export const on = (el, event, callback) => {
    el.addEventListener(event, callback)
    return () => el.removeEventListener(event, callback)
}

export const select = (el = document, query) => {
    const targets = el.querySelectorAll(query);
    return targets.length == 0 ? targets[0] : Array.from(targets)
}