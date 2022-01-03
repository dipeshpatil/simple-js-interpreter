import Lexer from "./Lexer.js";
import Token from "../Token/Token.js";

describe("Lexer Tests", () => {
  test("Lexer Should Return No Tokens When Nothing Is Passed To Lexer Constructor", () => {
    expect(new Lexer().generateTokens()).toStrictEqual([]);
  });

  test("Lexer Should Throw An Error When Illegal Character Is Entered As Input", () => {
    const illegalCharacterTextString = "1 + a";
    try {
      new Lexer(illegalCharacterTextString).generateTokens();
    } catch (err) {
      expect(err.message).toBe("Illegal Character Detected...");
    }
  });

  test("Lexer Should Be Able To Tokenize Just An Integer", () => {
    const justAnInteger = "7";
    const expectedTokens = [new Token("TT_NUMBER", 7)];
    const tokens = new Lexer(justAnInteger).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Be Able To Tokenize Just A Float", () => {
    const justAFloat = "7.77";
    const expectedTokens = [new Token("TT_NUMBER", 7.77)];
    const tokens = new Lexer(justAFloat).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Be Able To Tokenize A Simple Arithmetic Expression - I", () => {
    const simpleArithmeticExpressionITextString = "5 + 10 - 15";
    const expectedTokens = [
      new Token("TT_NUMBER", 5),
      new Token("TT_PLUS", "+"),
      new Token("TT_NUMBER", 10),
      new Token("TT_MINUS", "-"),
      new Token("TT_NUMBER", 15),
    ];
    const tokens = new Lexer(
      simpleArithmeticExpressionITextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Be Able To Tokenize A Simple Arithmetic Expression - II", () => {
    const simpleArithmeticExpressionIITextString = "5 * 24 / 12";
    const expectedTokens = [
      new Token("TT_NUMBER", 5),
      new Token("TT_MULTIPLY", "*"),
      new Token("TT_NUMBER", 24),
      new Token("TT_DIVIDE", "/"),
      new Token("TT_NUMBER", 12),
    ];
    const tokens = new Lexer(
      simpleArithmeticExpressionIITextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Be Able To Tokenize A Simple Arithmetic Expression With Parenthesis - III", () => {
    const simpleArithmeticExpressionIIITextString = "(5 * 24) / 12";
    const expectedTokens = [
      new Token("TT_LPAREN", "("),
      new Token("TT_NUMBER", 5),
      new Token("TT_MULTIPLY", "*"),
      new Token("TT_NUMBER", 24),
      new Token("TT_RPAREN", ")"),
      new Token("TT_DIVIDE", "/"),
      new Token("TT_NUMBER", 12),
    ];
    const tokens = new Lexer(
      simpleArithmeticExpressionIIITextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Be Able To Tokenize A Complex Arithmetic Expression With Parenthesis - I", () => {
    const complexArithmeticExpressionITextString =
      "((((1 + 5) * 6) // 6) - 6) + 10";
    const expectedTokens = [
      new Token("TT_LPAREN", "("),
      new Token("TT_LPAREN", "("),
      new Token("TT_LPAREN", "("),
      new Token("TT_LPAREN", "("),
      new Token("TT_NUMBER", 1),
      new Token("TT_PLUS", "+"),
      new Token("TT_NUMBER", 5),
      new Token("TT_RPAREN", ")"),
      new Token("TT_MULTIPLY", "*"),
      new Token("TT_NUMBER", 6),
      new Token("TT_RPAREN", ")"),
      new Token("TT_INT_DIVIDE", "//"),
      new Token("TT_NUMBER", 6),
      new Token("TT_RPAREN", ")"),
      new Token("TT_MINUS", "-"),
      new Token("TT_NUMBER", 6),
      new Token("TT_RPAREN", ")"),
      new Token("TT_PLUS", "+"),
      new Token("TT_NUMBER", 10),
    ];
    const tokens = new Lexer(
      complexArithmeticExpressionITextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Be Able To Tokenize An Expression With Pow and Integer Divide Operator", () => {
    const expressionWithPowAndIntegerDivideOperatorTextString = "2 ** 3 // 4";
    const expectedTokens = [
      new Token("TT_NUMBER", 2),
      new Token("TT_POW", "**"),
      new Token("TT_NUMBER", 3),
      new Token("TT_INT_DIVIDE", "//"),
      new Token("TT_NUMBER", 4),
    ];
    const tokens = new Lexer(
      expressionWithPowAndIntegerDivideOperatorTextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Be Able To Tokenize An Expression With Multiply And Modulo Operator", () => {
    const expressionWithMultiplyAndModuloOperatorTextString = "2 * 3 % 3";
    const expectedTokens = [
      new Token("TT_NUMBER", 2),
      new Token("TT_MULTIPLY", "*"),
      new Token("TT_NUMBER", 3),
      new Token("TT_MODULO", "%"),
      new Token("TT_NUMBER", 3),
    ];
    const tokens = new Lexer(
      expressionWithMultiplyAndModuloOperatorTextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Be Able To Tokenize An Expression With Just A Modulo Operator", () => {
    const expressionWithJustAModuloOperatorTextString = "3 % 3";
    const expectedTokens = [
      new Token("TT_NUMBER", 3),
      new Token("TT_MODULO", "%"),
      new Token("TT_NUMBER", 3),
    ];
    const tokens = new Lexer(
      expressionWithJustAModuloOperatorTextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Throw An Error When More Than 1 Decimal Point Exists In A Number", () => {
    const numberWithMoreThanOneDecimalPointTextString = "12..7";
    try {
      new Lexer(numberWithMoreThanOneDecimalPointTextString).generateTokens();
    } catch (err) {
      expect(err.message).toBe("More Than 1 Decimal Point Detected...");
    }
  });

  test("Lexer Should Append A Leading Zero When A Number Is Started With A Decimal And Convert Number To A Float", () => {
    const numberStartedWithADecimalTextString = ".7";
    const expectedTokens = [new Token("TT_NUMBER", parseFloat("0.7"))];
    const tokens = new Lexer(
      numberStartedWithADecimalTextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });

  test("Lexer Should Strip Off Decimal When Nothing Is Specified After Decimal Point And Convert Number Into An Integer", () => {
    const numberWithNothingSpecifiedAfterDecimalTextString = "7.";
    const expectedTokens = [new Token("TT_NUMBER", parseInt("7"))];
    const tokens = new Lexer(
      numberWithNothingSpecifiedAfterDecimalTextString
    ).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  });
});
