function intersect(...sets: Set<number>[]) {
  if (!sets.length) return new Set();
  const i = sets.reduce((m, s, i) => s.size < sets[m].size ? i : m, 0);
  const [smallest] = sets.splice(i, 1);
  const res = new Set();
  for (const val of smallest) {
    if (sets.every((s) => s.has(val))) {
      res.add(val);
    }
  }
  return res;
}

function parseSeeds(input: string): number[] {
  return input.split(": ")[1].split(" ").map((x) => parseInt(x));
}

function parseMap(input: string): number[][] {
  const [_, ranges_data] = input.split(":");

  return ranges_data.split("\n").map((x) =>
    x.split(" ").map((x) => parseInt(x))
  );
}

function parse(input: string) {
  const parts = input.split("\n\n").filter((x) => x.length > 0);

  return {
    seeds: parseSeeds(parts[0]),
    maps: [
      parseMap(parts[1]),
      parseMap(parts[2]),
      parseMap(parts[3]),
      parseMap(parts[4]),
      parseMap(parts[5]),
      parseMap(parts[6]),
      parseMap(parts[7]),
    ],
  };
}

export function sol1(input: string): number {
  const { seeds, maps } = parse(input);

  let min = Infinity;
  for (const seed of seeds) {
    let next = seed;
    for (const map of maps) {
      for (const [dest, src, len] of map) {
        if (next >= src && next < src + len) {
          next = dest + (next - src);
          break;
        }
      }
    }
    if (next < min) {
      min = next;
    }
  }

  return min;
}

if (import.meta.main) {
  console.log(sol1(Deno.readTextFileSync("./05.txt")));
}
