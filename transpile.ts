import { ScProgram, ScStatement, ScFunctionCall, ScString } from "./types";
import { isFunctionCall } from "./walk";

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
