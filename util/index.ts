import {
  resolve,
  dirname,
  fromFileUrl,
} from "https://deno.land/std@0.167.0/path/mod.ts";

export const getLines = <T extends string>(dir: ImportMeta["url"]) => {
  const decoder = new TextDecoder();

  return decoder
    .decode(Deno.readFileSync(resolve(dirname(fromFileUrl(dir)), "input.txt")))
    .split("\n") as T[];
};
