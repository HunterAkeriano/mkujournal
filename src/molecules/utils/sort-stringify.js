export function sortAndStringify(sortable) {
  const ordered = {}

  Object.keys(sortable)
    .sort()
    .forEach((key) => {
      ordered[key] = sortable[key]
    })

  return JSON.stringify(ordered)
}
