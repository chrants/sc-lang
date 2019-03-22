export enum TOKENS {
  COMMENT_START = "COMMENT_START",
  COMMENT_BODY = "COMMENT_BODY",
  END_STATEMENT_SYMBOL = "END_STATEMENT_SYMBOL",
  IDENTIFIER = "IDENTIFIER",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  LQUOTE = "LQUOTE",
  RQUOTE = "RQUOTE",
  STRING_BODY = "STRING_BODY",
  NONE = "NONE" // anything else or no rule
  //    INVALID,
}

export interface TokenValuePair {
  token: TOKENS;
  value: string;
}

export interface ScProgram {
  statements: ScStatement[];
}

export type ScStatement = ScComment | ScExpression;

export interface ScFunctionCall {
  functionIdentifier: string;
  argument: ScString;
}

export type ScExpression = ScFunctionCall | ScString;

export interface ScString {
  stringBody: string;
}

export interface ScComment {
  commentBody: string;
}
