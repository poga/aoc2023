function isDigit(c: string): boolean {
  return c >= "0" && c <= "9";
}

function getAdjNumber(
  data: Array<Array<string>>,
  row: number,
  col: number,
): Set<number> {
  const parts = new Set<number>();
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const offset of offsets) {
    const r = row + offset[0];
    const c = col + offset[1];
    if (isDigit(data[r][c])) {
      let start_pos = c;
      let end_pos = c;

      while (isDigit(data[r][start_pos - 1])) {
        start_pos -= 1;
      }
      while (isDigit(data[r][end_pos + 1])) {
        end_pos += 1;
      }

      parts.add(parseInt(data[r].slice(start_pos, end_pos + 1).join("")));
    }
  }

  return parts;
}

function parts(data: Array<Array<string>>): Array<[string, Set<number>]> {
  const parts = new Array<[string, Set<number>]>();
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (!isDigit(data[row][col]) && data[row][col] !== ".") {
        parts.push([data[row][col], getAdjNumber(data, row, col)]);
      }
    }
  }
  return parts;
}

export function sol1(input: string): number {
  const data = input.split("\n").map((line) => [".", ...line.split(""), "."]);

  return parts(data).reduce(
    (a, b) => a + [...b[1]].reduce((sum, x) => sum + x, 0),
    0,
  );
}

export function sol2(input: string): number {
  const data = input.split("\n").map((line) => [".", ...line.split(""), "."]);
  let total = 0;

  const p = parts(data);

  for (let i = 0; i < p.length; i++) {
    const [symbol, numbers] = p[i];
    if (symbol === "*" && numbers.size === 2) {
      total += [...numbers].reduce((a, b) => a * b, 1);
    }
  }
  return total;
}

if (import.meta.main) {
  console.log(sol1(Deno.readTextFileSync("./03_0.txt")));
  console.log(sol2(Deno.readTextFileSync("./03_0.txt")));
}
