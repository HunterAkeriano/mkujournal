export function useScrollLock() {
  const html = document.documentElement
  const header = document.querySelector('.header')

  function lockScroll() {
    const width = html.clientWidth
    html.style.paddingRight = `${window.innerWidth - width}px`
    html.style.overflow = 'hidden'
    header.style.paddingRight = `${window.innerWidth - width}px`
  }

  function unlockScroll() {
    html.style.overflow = ''
    html.style.paddingRight = ''
    header.style.paddingRight = ''
  }

  return {
    lockScroll,
    unlockScroll,
  }
}
