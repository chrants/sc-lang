#!/usr/bin/env ts-node
const meow = require("meow");
import * as fs from "fs";
import * as path from "path";
import { lex } from "./lex";
import { parse } from "./parse";
import { interpret, transpile } from "./walk";

const cli = meow(
  `
    Usage
      $ compile.ts <input file>
 
    Options
      --rainbow, -r  Include a rainbow
 
    Examples
      $ compile.ts unicorns --rainbow
      🌈 unicorns 🌈
`,
  {
    flags: {
      rainbow: {
        type: "boolean",
        alias: "r"
      }
    }
  }
);
console.log(cli.input);

const inputString = fs
  .readFileSync(path.join(__dirname, cli.input[0]))
  .toString();
console.log(inputString);

const tokens = lex(inputString);
console.log(tokens);

const program = parse(tokens);
console.log(program);

const transpiledToC = transpile(program);
console.log(transpiledToC);

interpret(program);
