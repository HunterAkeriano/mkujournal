const defaultOptions = {
  delay: 250,
}

export function debounce(func, options) {
  const opts = getOptions(options)
  let timeout = null

  return function (...args) {
    const callback = func.bind(this, ...args)

    return new Promise((resolve, reject) => {
      clearTimeout(timeout || undefined)

      if (options?.init) {
        options.init()
      }

      timeout = setTimeout(async () => {
        try {
          resolve(await callback())
        } catch (e) {
          reject(e)
        }
      }, opts.delay)
    })
  }
}

function getOptions(options) {
  if (!options) {
    return defaultOptions
  }
  return { ...defaultOptions, ...options }
}

export const delaySearch = 1200
