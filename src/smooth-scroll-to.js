import Promise from 'promise'

// prop默认为scrollTop, duration为毫秒值, target为滚动的目标位置。返回Promise对象
export default function (element, target, duration, prop) {
  if (!prop) {
    prop = 'scrollTop'
  }
  target = Math.round(target)
  duration = Math.round(duration)
  if (duration < 0) {
    return Promise.reject(new Error('bad duration'))
  }
  if (duration === 0) {
    element[prop] = target
    return Promise.resolve()
  }

  let startTime = Date.now()
  let endTime = startTime + duration

  let startTop = element[prop]
  let distance = target - startTop

  // based on http://en.wikipedia.org/wiki/Smoothstep
  let smoothStep = function (start, end, point) {
    if (point <= start) {
      return 0
    }
    if (point >= end) {
      return 1
    }
    let x = (point - start) / (end - start) // interpolation
    return x * x * (3 - 2 * x)
  }

  return new Promise(function (resolve, reject) {
    // This is to keep track of where the element's scrollTop is
    // supposed to be, based on what we're doing
    let previousTop = element[prop]

    // This is like a think function from a game loop
    let scrollFrame = function () {
      if (element[prop] !== previousTop) {
        reject(new Error('interrupted'))
        return
      }

      // set the scrollTop for this frame
      let now = Date.now()
      let point = smoothStep(startTime, endTime, now)
      let frameTop = Math.round(startTop + (distance * point))
      element[prop] = frameTop

      // check if we're done!
      if (now >= endTime) {
        resolve()
        return
      }

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      // if (element[prop] === previousTop &&
      //   element[prop] !== frameTop) {
      //   resolve()
      //   return
      // }
      previousTop = element[prop]

      // schedule next frame for execution
      setTimeout(scrollFrame, 0)
    }

    // boostrap the animation process
    setTimeout(scrollFrame, 0)
  })
}
