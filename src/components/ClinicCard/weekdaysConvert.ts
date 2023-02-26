
export const convert = (arr: Array<{
    id: number,
    start_at: string,
    end_at: string,
    status: boolean,
    weekday: string
}>) => {
    let a: any = []
    let b: any = []
    let result = [];



    if (arr.length === 7) {
        a = arr.filter(item => item.weekday !== "Воскресенье");
        b = arr.filter(item => item.weekday === "Воскресенье");
        if (a.every((el: any) => a[0].start_at === el.start_at && a[0].end_at === el.end_at)) {
            result.push({ day: 'пн-сб', start_at: a[0].start_at, end_at: a[0].end_at })
        }
        b.length && result.push({ day: 'вс', start_at: b[0].start_at, end_at: b[0].end_at })
    }
    if (arr.length === 6) {
        a = arr.filter(item => item.weekday !== "Суббота");
        b = arr.filter(item => item.weekday === "Суббота");
        if (a.every((el: any) => a[0].start_at === el.start_at && a[0].end_at === el.end_at)) {
            result.push({ day: 'пн-пт', start_at: a[0].start_at, end_at: a[0].end_at })
        }
        b.length && result.push({ day: 'сб', start_at: b[0].start_at, end_at: b[0].end_at })
    }
    return result
}   