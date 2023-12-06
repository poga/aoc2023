export function d01_1(input: string): number {
  return input.split("\n").map((x) => x.replaceAll(/[a-z]/gi, "")).map((x) => {
    return parseInt(x.split("")[0], 10) * 10 +
      parseInt(x.split("").at(-1) || "", 10);
  }).reduce((acc, cur) => {
    if (isNaN(cur)) return acc;
    acc += cur;
    return acc;
  });
}

const numMap = {
  "one": "o1e",
  "two": "t2o",
  "three": "t3e",
  "four": "f4r",
  "five": "f5e",
  "six": "s6x",
  "seven": "s7n",
  "eight": "e8t",
  "nine": "n9e",
};

export function d01_2(input: string): number {
  return input.split("\n")
    .filter((x) => x.length > 0)
    .map((x) => {
      for (const [key, value] of Object.entries(numMap)) {
        x = x.replaceAll(key, value.toString());
      }
      return x;
    }).map((x) => x.replaceAll(/[a-z]/gi, ""))
    .map((x) => {
      return parseInt(x.split("")[0], 10) * 10 +
        parseInt(x.split("").at(-1) || "", 10);
    }).reduce((acc, cur) => {
      acc += cur;
      return acc;
    });
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(d01_1(Deno.readTextFileSync("./01_0.txt")));
  console.log(d01_2(Deno.readTextFileSync("./01_0.txt")));
}
