function findValidScrollParent (curEl, direction) {
  let pEl = curEl && curEl.parentNode
  if (curEl && pEl) {
    let finalStyle = pEl.currentStyle ? pEl.currentStyle : document.defaultView.getComputedStyle(pEl, null)
    let vals = ['auto', 'scroll']
    if (vals.indexOf(finalStyle.overflow) > -1 || vals.indexOf(finalStyle['overflow' + (direction === 'vertical' ? 'Y' : 'X')]) > -1) {
      return pEl
    } else {
      return findValidScrollParent(pEl, direction)
    }
  } else {
    return null
  }
}

// 父级元素必须有 overflow 设置
export const scrollIntoView = function (el, offset = 0, direction = 'vertical') {
  let prop = direction === 'vertical' ? 'Top' : 'Left'
  let pEl = findValidScrollParent(el, direction)
  if (pEl) {
    pEl['scroll' + prop] = el['offset' + prop] + offset
  }
}
