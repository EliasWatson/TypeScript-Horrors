export function generateAdditionTables(): string {
  const additionTable = generateAdditionTable();
  const carryTable = generateCarryTable();

  return [
    `type AdditionLookupTable = ${additionTable};`,
    `type CarryLookupTable = ${carryTable};`,
  ].join("\n\n");
}

function generateAdditionTable(): string {
  const entries: string[] = [];

  for (let a = 0; a < 10; a++) {
    for (let b = 0; b < 10; b++) {
      const value = (a + b).toString().at(-1);
      entries.push(`"${a}${b}":"${value}"`);
    }
  }

  return `{${entries.join(",")}}`;
}

function generateCarryTable(): string {
  const entries: string[] = [];

  for (let a = 0; a < 10; a++) {
    for (let b = 0; b < 10; b++) {
      const value = a + b < 10 ? "false" : "true";
      entries.push(`"${a}${b}":${value}`);
    }
  }

  return `{${entries.join(",")}}`;
}
