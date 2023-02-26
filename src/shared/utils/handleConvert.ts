import { ClinicOption } from 'shared/types/clinic'

const DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export const handleConvert = (
  arr: Array<ClinicOption | undefined> | undefined
) => {
  if (arr === undefined) return
  let result: any = [[]]
  let newArr: Array<ClinicOption | undefined> = [...arr]
  let a: number = 0
  result[0].push(arr[0])

  for (let i = 0; result.flat().length != newArr.length; ) {
    let s = 0
    for (let j = i + 1; j < newArr.length; j++) {
      if (
        result[a][0].start_at === newArr[j]?.start_at &&
        result[a][0].end_at === newArr[j]?.end_at
      ) {
        result[a].push(newArr[j])
        newArr[j] = undefined
      } else {
        if (s == 0 && newArr[j] != undefined) {
          s = j
          result.push([newArr[j]])
        }
      }
    }
    i = s
    a = a + 1
  }

  let result1: Array<{ day: any; end_at: string; start_at: string }> =
    []
  let k: number = 0
  let b: number = 0

  result.map((item: any[], i: number) => {
    result1.push({
      day: [DAYS[item[0].weekday]],
      start_at: item[0].start_at,
      end_at: item[0].end_at,
    })
    item.forEach((el: any, j: number) => {
      if (el.weekday == 0) {
        result1[0].day = ['вс']
        b = 2
      } else if (item[j + 1] !== undefined) {
        if (el.weekday - item[j + 1].weekday == -1 && k > 0) {
          (result1[i].day[result1[i].day.length - 2] = '-'),
            (result1[i].day[result1[i].day.length - 1] = DAYS[j + 2])
          k++
        } else if (el.weekday - item[j + 1].weekday == -1 && k == 0) {
          result1[i].day.push(','), result1[i].day.push(DAYS[j + 2])
          k++
        } else if (el.weekday - item[j + 1].weekday < -1) {
          result1[i].day.push(','),
            result1[i].day.push(DAYS[item[j + 1].weekday])
          k = 0
        }
      }
    })
    result1[i].day = result1[i].day.join('')
  })

  return result1
}
