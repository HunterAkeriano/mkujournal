export function useScrollLock() {
  const html = document.documentElement

  function lockScroll() {
    html.style.paddingRight = `${window.innerWidth - html.clientWidth}px`
    html.style.overflow = 'hidden'
  }

  function unlockScroll() {
    html.style.overflow = ''
    html.style.paddingRight = ''
  }

  return {
    lockScroll,
    unlockScroll,
  }
}
