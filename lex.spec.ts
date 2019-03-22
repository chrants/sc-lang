import { lex, isQuote } from "./lex";
import { TOKENS } from "./types";

describe("lexer", () => {
  describe("recognizes comments", () => {
    test("with newline character", () => {
      const tokens = lex("// I am a comment\n");
      expect(tokens).toEqual([
        { token: TOKENS.COMMENT_START, value: "//" },
        { token: TOKENS.COMMENT_BODY, value: " I am a comment" }
      ]);
    });
    test("without newline character", () => {
      const tokens = lex("// I am a comment");
      expect(tokens).toEqual([
        { token: TOKENS.COMMENT_START, value: "//" },
        { token: TOKENS.COMMENT_BODY, value: " I am a comment" }
      ]);
    });
  });

  describe("recognizes strings", () => {
    test("single quote", () => {
      const tokens = lex('"I am a string!!"');
      expect(tokens).toEqual([
        { token: TOKENS.LQUOTE, value: '"' },
        { token: TOKENS.STRING_BODY, value: "I am a string!!" },
        { token: TOKENS.RQUOTE, value: '"' }
      ]);
    });
    test("double quote", () => {
      const tokens = lex("'I am a string!!'");
      expect(tokens).toEqual([
        { token: TOKENS.LQUOTE, value: "'" },
        { token: TOKENS.STRING_BODY, value: "I am a string!!" },
        { token: TOKENS.RQUOTE, value: "'" }
      ]);
    });
    test("with non-matching quotes inside", () => {
      const tokens = lex("'I am a string!!'");
      expect(tokens).toEqual([
        { token: TOKENS.LQUOTE, value: "'" },
        { token: TOKENS.STRING_BODY, value: "I am a string!!" },
        { token: TOKENS.RQUOTE, value: "'" }
      ]);
    });
  });

  describe("recognizes strings", () => {
    test("single quote", () => {
      const tokens = lex('"I am a string!!"');
      expect(tokens).toEqual([
        { token: TOKENS.LQUOTE, value: '"' },
        { token: TOKENS.STRING_BODY, value: "I am a string!!" },
        { token: TOKENS.RQUOTE, value: '"' }
      ]);
    });
    test("double quote", () => {
      const tokens = lex("'I am a string!!'");
      expect(tokens).toEqual([
        { token: TOKENS.LQUOTE, value: "'" },
        { token: TOKENS.STRING_BODY, value: "I am a string!!" },
        { token: TOKENS.RQUOTE, value: "'" }
      ]);
    });
    test("with non-matching quotes inside", () => {
      const tokens = lex("'I am a string!!'");
      expect(tokens).toEqual([
        { token: TOKENS.LQUOTE, value: "'" },
        { token: TOKENS.STRING_BODY, value: "I am a string!!" },
        { token: TOKENS.RQUOTE, value: "'" }
      ]);
    });
  });

  describe("recognizes function invocations", () => {
    test("with no end statement terminator", () => {
      const tokens = lex('add("1")');
      expect(tokens).toEqual([
        { token: TOKENS.IDENTIFIER, value: "add" },
        { token: TOKENS.LPAREN, value: "(" },
        { token: TOKENS.LQUOTE, value: '"' },
        { token: TOKENS.STRING_BODY, value: "1" },
        { token: TOKENS.RQUOTE, value: '"' },
        { token: TOKENS.RPAREN, value: ")" }
      ]);
    });

    test("with alphanumeric characters", () => {
      const tokens = lex('ad2d("1 3");');
      expect(tokens).toEqual([
        { token: TOKENS.IDENTIFIER, value: "ad2d" },
        { token: TOKENS.LPAREN, value: "(" },
        { token: TOKENS.LQUOTE, value: '"' },
        { token: TOKENS.STRING_BODY, value: "1 3" },
        { token: TOKENS.RQUOTE, value: '"' },
        { token: TOKENS.RPAREN, value: ")" },
        { token: TOKENS.END_STATEMENT_SYMBOL, value: ";" }
      ]);
    });
  });

  it("tokenizes a simple file", () => {
    const tokens = lex(`\
// This is a fake scala file.
"string";
println('Hello');

'""'; // comment on same line`);
    expect(tokens).toEqual([
      { token: "COMMENT_START", value: "//" },
      { token: "COMMENT_BODY", value: " This is a fake scala file." },
      { token: "LQUOTE", value: '"' },
      { token: "STRING_BODY", value: "string" },
      { token: "RQUOTE", value: '"' },
      { token: "END_STATEMENT_SYMBOL", value: ";" },
      { token: "IDENTIFIER", value: "println" },
      { token: "LPAREN", value: "(" },
      { token: "LQUOTE", value: "'" },
      { token: "STRING_BODY", value: "Hello" },
      { token: "RQUOTE", value: "'" },
      { token: "RPAREN", value: ")" },
      { token: "END_STATEMENT_SYMBOL", value: ";" },
      { token: "LQUOTE", value: "'" },
      { token: "STRING_BODY", value: '""' },
      { token: "RQUOTE", value: "'" },
      { token: "END_STATEMENT_SYMBOL", value: ";" },
      { token: "COMMENT_START", value: "//" },
      { token: "COMMENT_BODY", value: " comment on same line" }
    ]);
  });
});
