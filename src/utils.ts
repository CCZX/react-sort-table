export function isNumber(n: strOrNum) {
  return /^[0-9]+.?[0-9]*$/.test(String(n))
}
