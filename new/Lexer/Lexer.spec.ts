import Lexer from "./Lexer";
import Token from "../Token/Token";

describe("Lexer Tests", () => {
  test("Lexer Should Be Able To Tokenize Just An Integer", () => {
    const justAnInteger = "7";
    const expectedTokens = [
      new Token("TT_NUMBER", 7)
    ]
    const tokens = new Lexer(justAnInteger).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  })

  test("Lexer Should Be Able To Tokenize Just A Float", () => {
    const justAFloat = "7.77";
    const expectedTokens = [
      new Token("TT_NUMBER", 7.77)
    ]
    const tokens = new Lexer(justAFloat).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  })

  test("Lexer Should Be Able To Tokenize A Simple Arithmetic Expression - I", () => {
    const simpleArithmeticExpressionITextString = "5 + 10 - 15";
    const expectedTokens = [
      new Token("TT_NUMBER", 5),
      new Token("TT_PLUS", '+'),
      new Token("TT_NUMBER", 10),
      new Token("TT_MINUS", '-'),
      new Token("TT_NUMBER", 15)
    ]
    const tokens = new Lexer(simpleArithmeticExpressionITextString).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  })

  test("Lexer Should Be Able To Tokenize A Simple Arithmetic Expression - II", () => {
    const simpleArithmeticExpressionIITextString = "5 * 24 / 12";
    const expectedTokens = [
      new Token("TT_NUMBER", 5),
      new Token("TT_MULTIPLY", '*'),
      new Token("TT_NUMBER", 24),
      new Token("TT_DIVIDE", '/'),
      new Token("TT_NUMBER", 12)
    ]
    const tokens = new Lexer(simpleArithmeticExpressionIITextString).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  })

  test("Lexer Should Be Able To Tokenize A Simple Arithmetic Expression With Parenthesis - III", () => {
    const simpleArithmeticExpressionIIITextString = "(5 * 24) / 12";
    const expectedTokens = [
      new Token("TT_LPAREN", '('),
      new Token("TT_NUMBER", 5),
      new Token("TT_MULTIPLY", '*'),
      new Token("TT_NUMBER", 24),
      new Token("TT_RPAREN", ')'),
      new Token("TT_DIVIDE", '/'),
      new Token("TT_NUMBER", 12)
    ]
    const tokens = new Lexer(simpleArithmeticExpressionIIITextString).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  })

  test("Lexer Should Be Able To Tokenize A Complex Arithmetic Expression With Parenthesis - I", () => {
    const complexArithmeticExpressionITextString = "((((1 + 5) * 6) // 6) - 6) + 10";
    const expectedTokens = [
      new Token("TT_LPAREN", '('),
      new Token("TT_LPAREN", '('),
      new Token("TT_LPAREN", '('),
      new Token("TT_LPAREN", '('),
      new Token("TT_NUMBER", 1),
      new Token("TT_PLUS", '+'),
      new Token("TT_NUMBER", 5),
      new Token("TT_RPAREN", ')'),
      new Token("TT_MULTIPLY", '*'),
      new Token("TT_NUMBER", 6),
      new Token("TT_RPAREN", ')'),
      new Token("TT_INT_DIVIDE", '//'),
      new Token("TT_NUMBER", 6),
      new Token("TT_RPAREN", ')'),
      new Token("TT_MINUS", '-'),
      new Token("TT_NUMBER", 6),
      new Token("TT_RPAREN", ')'),
      new Token("TT_PLUS", '+'),
      new Token("TT_NUMBER", 10),
    ]
    const tokens = new Lexer(complexArithmeticExpressionITextString).generateTokens();
    expect(tokens).toStrictEqual(expectedTokens);
  })
})
