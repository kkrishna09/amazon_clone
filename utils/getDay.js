import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
export function getDay(noOfDay){
    const today =dayjs()
    const desireDate=today.add(noOfDay,"day")
    return desireDate.format("dddd MMMM D")
}