export function isNumber(n: strOrNum) {
  return /^[0-9]+.?[0-9]*$/.test(String(n))
}

// TODO：完善
export function deepClone(arg: any) {
  return JSON.parse(JSON.stringify(arg))
}

export function moveArray(arr: any[], oldIndex: number, newIndex: number) {
  console.log(oldIndex, newIndex)
  const cloneArr: any[] = deepClone(arr)
  const _newIndex = newIndex > cloneArr.length ? cloneArr.length : newIndex
  const oldItem = cloneArr.splice(oldIndex, 1)
  const tail = cloneArr.splice(_newIndex)
  return [...cloneArr, ...oldItem, ...tail]
}

/**
 *a,b,c 
 *oldItem:a
 _newIndex: 1
 */

// [1,3,2,5,4]
// moveArray([], 2, 4)
