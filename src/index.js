import { getScrollbarWidth } from './get-scrollbar-width'
import * as ResizeEvent from './resize-event'
import { scrollIntoView } from './scroll-into-view'
import date from './date'
import currencyFormat from './currency-formater'
import smoothScrollTo from './smooth-scroll-to'
import getLocationOrigin from './get-location-origin'

export default {
  getScrollbarWidth,
  ResizeEvent,
  scrollIntoView,
  toDate: date.toDate,
  dateFormat: date.dateFormat,
  currencyFormat,
  smoothScrollTo,
  getLocationOrigin
}
