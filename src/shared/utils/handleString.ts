export const capitalize = (string: string) =>
  string[0].toUpperCase() + string.substring(1)

export const isComparable = (
  string_one: string | null,
  string_two: string | null
): boolean => {
  if (!string_one || !string_two) return true

  return (
    string_one.toLowerCase().includes(string_two.toLowerCase()) ||
    string_two.toLowerCase().includes(string_one.toLowerCase())
  )
}
