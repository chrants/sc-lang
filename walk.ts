import { ScProgram, ScStatement, ScFunctionCall, ScString } from "./types";

export const isFunctionCall = (
  statement: ScStatement
): statement is ScFunctionCall => "functionIdentifier" in statement;

const functionMap = {
  println: (value: string) => console.log(value),
  add: (value: string) => {
    console.log(value.split(" ").reduce((p, n) => p + Number(n), 0));
  }
};

export const transpile = (program: ScProgram): string => {
  let transpiled = "";
  program.statements.forEach((statement: ScStatement) => {
    if (isFunctionCall(statement)) {
      const fnCall = `${statement.functionIdentifier}("${
        statement.argument.stringBody
      }");\n`;
      transpiled += fnCall;
    }
  });
  return transpiled;
};

export const interpret = (program: ScProgram) => {
  console.log();
  console.log("---------------------");

  program.statements.forEach((statement: ScStatement) => {
    if (isFunctionCall(statement)) {
      if (functionMap[statement.functionIdentifier]) {
        functionMap[statement.functionIdentifier](
          statement.argument.stringBody
        );
      } else {
        // error -- non-existent function
      }
    }
  });
};

export const walk = (program: ScProgram) => {
  program.statements.forEach((statement: ScStatement) => {
    if (isFunctionCall(statement)) {
    }
  });
};
