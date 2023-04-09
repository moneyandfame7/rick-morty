export const insert = <T>(array: T[], index: number, items: T[]) => {
  return array.splice(index, 0, ...items)
}
