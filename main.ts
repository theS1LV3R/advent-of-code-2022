const days = [...Deno.readDirSync("./src")].sort((a, b) =>
  a.name.localeCompare(b.name)
);

for (const { name } of days) {
  console.log(`===== Running ${name} =====`);
  await import(`./src/${name}/index.ts`).then(() => console.log(""));
}
