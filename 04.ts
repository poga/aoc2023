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

function parse(input: string) {
  return input.split("\n").filter((x) => x.length > 0).map((line) => {
    const [card, nums] = line.split(":");
    const cardID = card.match(/Card\s*(\d+)/)?.[1];
    const [winningNumbers, numbers] = nums.split("|").map((p) => {
      return p.split(" ").map((n) => parseInt(n.trim(), 10)).filter((n) =>
        !isNaN(n)
      );
    });
    return {
      cardID,
      winningNumbers,
      numbers,
    };
  });
}

export function sol1(input: string): number {
  const games = parse(input);

  let score = 0;

  for (const { winningNumbers, numbers } of games) {
    const winningSet = new Set(winningNumbers);
    const set = new Set(numbers);

    if (intersect(winningSet, set).size === 0) continue;
    score += 2 ** (intersect(winningSet, set).size - 1);
  }

  return score;
}

export function sol2(input: string): number {
  const games = parse(input);

  const cards = new Array(games.length).fill(1);
  cards[0] = 1;

  for (let i = 0; i < games.length; i++) {
    if (cards[i] === 0) continue;
    const { winningNumbers, numbers } = games[i];
    const winningSet = new Set(winningNumbers);
    const set = new Set(numbers);

    const win = intersect(winningSet, set).size;

    for (let j = 1; j <= win; j++) {
      cards[i + j] += 1 * cards[i];
    }
  }

  return cards.reduce((a, b) => a + b, 0);
}

if (import.meta.main) {
  console.log(sol1(Deno.readTextFileSync("./04.txt")));
  console.log(sol2(Deno.readTextFileSync("./04.txt")));
}
