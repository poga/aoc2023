const MAX_GREEN = 13;
const MAX_BLUE = 14;
const MAX_RED = 12;

export function sol1(input: string): number {
  return input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const [game, draw] = line.split(":").map((x) => x.trim());
      const gameID = parseInt(game.split(" ")[1], 10);

      const maxGreenDraw = Math.max(
        ...[...draw.matchAll(/(\d+) green/g)].map((x) => parseInt(x[1], 10)),
      );
      const maxBlue = Math.max(
        ...[...draw.matchAll(/(\d+) blue/g)].map((x) => parseInt(x[1], 10)),
      );
      const maxRedDraw = Math.max(
        ...[...draw.matchAll(/(\d+) red/g)].map((x) => parseInt(x[1], 10)),
      );

      return { id: gameID, maxGreenDraw, maxBlue, maxRedDraw };
    })
    .filter((line) => {
      if (line.maxGreenDraw > MAX_GREEN) return false;
      if (line.maxBlue > MAX_BLUE) return false;
      if (line.maxRedDraw > MAX_RED) return false;
      return true;
    })
    .map((line) => line.id)
    .reduce((acc, cur) => acc + cur, 0);
}

export function sol2(input: string): number {
  return input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const [game, draw] = line.split(":").map((x) => x.trim());
      const gameID = parseInt(game.split(" ")[1], 10);

      const maxGreenDraw = Math.max(
        ...[...draw.matchAll(/(\d+) green/g)].map((x) => parseInt(x[1], 10)),
      );
      const maxBlue = Math.max(
        ...[...draw.matchAll(/(\d+) blue/g)].map((x) => parseInt(x[1], 10)),
      );
      const maxRedDraw = Math.max(
        ...[...draw.matchAll(/(\d+) red/g)].map((x) => parseInt(x[1], 10)),
      );

      return { id: gameID, maxGreenDraw, maxBlue, maxRedDraw };
    })
    .map((game) => game.maxGreenDraw * game.maxBlue * game.maxRedDraw)
    .reduce((acc, cur) => acc + cur, 0);
}

if (import.meta.main) {
  console.log(sol1(Deno.readTextFileSync("./02_0.txt")));
  console.log(sol2(Deno.readTextFileSync("./02_0.txt")));
}
