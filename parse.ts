import {
  TokenValuePair,
  TOKENS,
  ScProgram,
  ScStatement,
  ScFunctionCall
} from "./types";

export const parse = (tokens: TokenValuePair[]): ScProgram => {
  const program: ScProgram = { statements: [] };
  let currentStatement: ScStatement = null;

  for (const tok of tokens) {
    switch (tok.token) {
      case TOKENS.IDENTIFIER: {
        currentStatement = {
          functionIdentifier: tok.value,
          argument: { stringBody: "" }
        };
        break;
      }
      case TOKENS.STRING_BODY: {
        if (currentStatement) {
          (currentStatement as ScFunctionCall).argument.stringBody = tok.value;
          program.statements.push(currentStatement);
          currentStatement = null;
        } else {
          currentStatement = { stringBody: tok.value };
          program.statements.push(currentStatement);
          currentStatement = null;
        }
        break;
      }
      case TOKENS.COMMENT_BODY: {
        currentStatement = { commentBody: tok.value };
        program.statements.push(currentStatement);
        currentStatement = null;
        break;
      }

      default:
    }
  }

  return program;
};
