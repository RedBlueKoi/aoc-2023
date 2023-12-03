const inputFile = Bun.file("input.txt")
// Part one
const input = await inputFile.text()

const lines = input.split("\n").reduce((acc: number[], line) => {
  const i = line.replaceAll(/[^0-9]/g, "").split("")
  const item = parseInt(i[0] + i[i.length - 1])
  return [...acc, item]
}, [])

const result = lines.reduce((acc, line) => {
  return acc + line
}, 0)

// Part two
const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9
} as const
type Key = keyof typeof numberMap

const processLine = (line: string): string => {
  if (line.length === 0) return ""
  const keys = Object.keys(numberMap)
  const firstKey = keys.find((key) => line.startsWith(key)) as Key
  if (!firstKey) return processLine(line.slice(1))
  return `${numberMap[firstKey]}${processLine(line.slice(1))}`
}

const updatedLines = input.split("\n").map(processLine)
const answer = updatedLines
  .map((line) => line.split(""))
  .map((line) => parseInt(line[0] + line.at(-1)))
  .reduce((acc, line) => acc + line, 0)

console.log(answer)
