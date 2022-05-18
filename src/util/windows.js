export const backpage = () => {
    window.history.back()
  }
  
export const getWindowWidth = () => {
  const w = window || {} // eslint-disable-line no-use-before-define
  return w.innerWidth || 1200
}
  
const windowBreakpoint = 992
export const isBelowBreakpoint = () => getWindowWidth() < windowBreakpoint

export const getPathname = () => {
  const w = window || {} // eslint-disable-line no-use-before-define
  return w.location && w.location.pathname ? w.location.pathname : '/'
}
  