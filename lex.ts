import { TOKENS, TokenValuePair } from "./types";

export const isQuote = (char: string) => char === '"' || char === "'";
export const isAlpha = (char: string) => /[a-zA-Z_]/.test(char);
export const isAlphaNum = (char: string) => /\w/.test(char);

export const lex = (input: string): TokenValuePair[] => {
  const tokens: TokenValuePair[] = [];
  const sanitizedInput = input + "\n";
  let next = { token: TOKENS.NONE, value: "" };

  for (const char of sanitizedInput) {
    switch (next.token) {
      case TOKENS.NONE: {
        if (char === "/") {
          next = { token: TOKENS.COMMENT_START, value: "/" };
        } else if (isQuote(char)) {
          next = { token: TOKENS.LQUOTE, value: char };
        } else if (isAlpha(char)) {
          next = { token: TOKENS.IDENTIFIER, value: char };
        }
        break;
      }
      case TOKENS.END_STATEMENT_SYMBOL: {
        break;
      }
      case TOKENS.COMMENT_START: {
        if (char === "/" && next.value === "/") {
          next.value += char;
          tokens.push(next);
          next = { token: TOKENS.COMMENT_BODY, value: "" };
        } else {
          // Isn't valid commment
          // Syntax error
        }
        break;
      }
      case TOKENS.COMMENT_BODY: {
        if (char !== "\n") {
          next.value += char;
        } else {
          tokens.push(next);
          next = { token: TOKENS.NONE, value: "" };
        }
        break;
      }
      case TOKENS.LQUOTE: {
        tokens.push(next);
        if (char === next.value) {
          next = { token: TOKENS.RQUOTE, value: char };
        } else {
          next = { token: TOKENS.STRING_BODY, value: char };
        }
        break;
      }
      case TOKENS.RQUOTE: {
        tokens.push(next);
        if (char === ";") {
          next = { token: TOKENS.END_STATEMENT_SYMBOL, value: ";" };
          tokens.push(next);
          next = { token: TOKENS.NONE, value: "" };
        } else if (char === ")") {
          next = { token: TOKENS.RPAREN, value: ")" };
        } else {
          // error
        }
        break;
      }
      case TOKENS.STRING_BODY: {
        const lastToken = tokens[tokens.length - 1];
        if (char === lastToken.value) {
          // RQUOTE found
          tokens.push(next);
          next = { token: TOKENS.RQUOTE, value: char };
        } else {
          next.value += char;
        }
        break;
      }
      case TOKENS.IDENTIFIER: {
        if (isAlphaNum(char)) {
          next.value += char;
        } else if (char === "(") {
          tokens.push(next);
          next = { token: TOKENS.LPAREN, value: "(" };
        } else {
          // error
        }
        break;
      }
      case TOKENS.LPAREN: {
        tokens.push(next);
        if (isQuote(char)) {
          next = { token: TOKENS.LQUOTE, value: char };
        } else {
          // for now this is invalid syntax
        }
        break;
      }
      case TOKENS.RPAREN: {
        tokens.push(next);
        if (char === ";") {
          next = { token: TOKENS.END_STATEMENT_SYMBOL, value: ";" };
          tokens.push(next);
          next = { token: TOKENS.NONE, value: "" };
        } else {
          // error
        }
        break;
      }

      default:
    }
  }

  if (next.token !== TOKENS.NONE) {
    // Last token isn't back to default
    // Something's wrong -- syntax error
  }

  return tokens;
};
