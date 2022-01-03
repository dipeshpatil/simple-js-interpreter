import Lexer from "../Lexer/Lexer.js";
import Parser from "./Parser.js";
import OneChildNode from "../Node/OneChildNode.js";
import TwoChildNode from "../Node/TwoChildNode.js";

const INVALID_SYNTAX_ERROR_MSG = "Invalid Syntax...";

describe("Parser Tests", () => {
  test("Parser Should Return 'undefined' For Empty Token Array", () => {
    expect(new Parser([]).parseTokens()).toBe(undefined);
  });

  test("Parser Should Throw An Error For An Expression With Invalid Syntax", () => {
    const expressionWithInvalidSyntax = "1 +";
    try {
      new Parser(
        new Lexer(expressionWithInvalidSyntax).generateTokens()
      ).parseTokens();
    } catch (err) {
      expect(err.message).toBe(INVALID_SYNTAX_ERROR_MSG);
    }
  });

  test("Parser Should Generate A Parse Tree For A Simple Arithmetic Expression - I", () => {
    const simpleArithmeticExpressionITextString = "1 + 2";
    const expectedParseTree = new TwoChildNode(
      "NT_ADD",
      new OneChildNode("NT_NUMBER", 1),
      new OneChildNode("NT_NUMBER", 2)
    );
    const parseTree = new Parser(
      new Lexer(simpleArithmeticExpressionITextString).generateTokens()
    ).parseTokens();
    expect(parseTree).toStrictEqual(expectedParseTree);
  });

  test("Parser Should Generate A Parse Tree For A Simple Arithmetic Expression - II", () => {
    const simpleArithmeticExpressionIITextString = "1 + 2 - 3 + 4";
    const expectedParseTree = new TwoChildNode(
      "NT_ADD",
      new TwoChildNode(
        "NT_SUB",
        new TwoChildNode(
          "NT_ADD",
          new OneChildNode("NT_NUMBER", 1),
          new OneChildNode("NT_NUMBER", 2)
        ),
        new OneChildNode("NT_NUMBER", 3)
      ),
      new OneChildNode("NT_NUMBER", 4)
    );
    const parseTree = new Parser(
      new Lexer(simpleArithmeticExpressionIITextString).generateTokens()
    ).parseTokens();
    expect(parseTree).toStrictEqual(expectedParseTree);
  });

  test("Parser Should Generate A Parse Tree For A Simple Arithmetic Expression - III", () => {
    const simpleArithmeticExpressionIITextString = "1 * 2 / 3 % 4";
    const expectedParseTree = new TwoChildNode(
      "NT_MODULO",
      new TwoChildNode(
        "NT_DIVIDE",
        new TwoChildNode(
          "NT_MULTIPLY",
          new OneChildNode("NT_NUMBER", 1),
          new OneChildNode("NT_NUMBER", 2)
        ),
        new OneChildNode("NT_NUMBER", 3)
      ),
      new OneChildNode("NT_NUMBER", 4)
    );
    const parseTree = new Parser(
      new Lexer(simpleArithmeticExpressionIITextString).generateTokens()
    ).parseTokens();
    expect(parseTree).toStrictEqual(expectedParseTree);
  });
});
