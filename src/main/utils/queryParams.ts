export const parseIncludeQueryParams = <T>(include: string): T => {
  return include.split(',').map((item) => item.trim()) as T
}
