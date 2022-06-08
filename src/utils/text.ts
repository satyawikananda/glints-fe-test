export const capitalizeStr = (str: string): string => {
  const string = str.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}
