export function isEmail(email: string): boolean {
  const regEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return regEmail.test(email)
}

export function isPassword(password: string): boolean {
  const regPassword = /^(?=.*[A-Z])$/
  return regPassword.test(password)
}

export function toArray(field: any): Array<any> {
  const array = Array.isArray(field) ? field : [field]
  return array.filter((element) => element !== '')
}

export function roundToTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export function getNormalDate(): Date {
  let d = new Date()
  const date = new Date(
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
      d.getMilliseconds()
    )
  )
  return date
}

export function reduceArrayToTwo(arr: Array<Object>) {
  if (arr.length > 2) {
    arr.splice(2, arr.length - 2)
    return arr
  }
  return arr
}

export function encrypt(password: string): string {
  return Buffer.from(encodeURIComponent(escape(password))).toString('base64')
}

export function decrypt(password: string): string {
  return Buffer.from(unescape(decodeURIComponent(password)), 'base64').toString()
}
