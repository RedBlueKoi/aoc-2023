const inputFile = Bun.file("02/input.txt")
// Part one
const input = await inputFile.text()

type Color = "red" | "green" | "blue"
type CubeSet = {
  [key in Color]?: number
}
type Game = {
  id: number
  sets: CubeSet[]
}

const lines = input.split("\n").reduce((acc: string[], line) => {
  return [...acc, line]
}, [])

const games = lines.reduce((acc: Game[], line) => {
  const [idInput, setsInputs] = line.split(": ")
  // 1 blue, 1 red; 9 green, 14 red, 1 blue; 3 blue, 7 green
  const sets = setsInputs.split("; ").reduce((acc: CubeSet[], input) => {
    const cubes = input.split(", ")
    const set: CubeSet = {}
    cubes.forEach((cube) => {
      const [amount, color] = cube.split(" ")
      set[color as Color] = parseInt(amount)
    })

    return [...acc, set]
  }, [])
  const [_, id] = idInput.split(" ")
  const game: Game = {
    id: parseInt(id),
    sets
  }
  return [...acc, game]
}, [])

const firstHalf = () => {
  const validationConfig: CubeSet = {
    red: 12,
    green: 13,
    blue: 14
  }

  const isSetPossible = (set: CubeSet) => {
    return Object.entries(set).every(([color, amount]) => {
      return amount <= validationConfig[color]
    })
  }

  const validGames = games.filter(({ sets }) => {
    return sets.every(isSetPossible)
  })

  return validGames.reduce((acc, { id }) => {
    return acc + id
  }, 0)
}
const secondHalf = () => {
  const getGamePower = (game: Game) => {
    const minimalSet = game.sets.reduce((acc: CubeSet, set) => {
      const { red, green, blue } = set
      if (red) {
        if (!acc.red) acc.red = red
        else if (acc.red < red) acc.red = red
      }
      if (green) {
        if (!acc.green) acc.green = green
        else if (acc.green < green) acc.green = green
      }
      if (blue) {
        if (!acc.blue) acc.blue = blue
        else if (acc.blue < blue) acc.blue = blue
      }
      return acc
    }, {})

    return Object.values(minimalSet).reduce((acc, amount) => {
      return acc * amount
    }, 1)
  }

  const powers = games.map(getGamePower)

  return powers.reduce((acc: number, gamePower) => {
    return acc + gamePower
  }, 0)
}

console.log("Part one:", firstHalf())
console.log("Part two:", secondHalf())
