import { CONFIRM_CODE_LENGTH } from 'shared/constants'

export const validateCodeField = (
  value: string,
  newValue: string
): string => {
  return /[^0-9]/g.test(newValue) ||
    newValue.length > CONFIRM_CODE_LENGTH
    ? value
    : newValue
}
