import Token from "../Token/Token.js";
import TokenConstants from "../Token/TokenConstants.js";
import OperatorConstants from "../Token/OperatorConstants.js";

const LexerConstants = {
  DECIMAL: ".",
  WHITESPACE: " \n\t",
  DIGITS: "0123456789",
  BINARY_DIGITS: "01",
  HEXADECIMAL_DIGITS: "0123456789ABCDEF",
  OCTAL_DIGITS: "01234567",
};

class Lexer {
  constructor(text = "") {
    this.text = text;
    this.index = 0;
    this.currentChar = "";
    this.tokens = [];

    this.advance();
  }

  advance = () => {
    this.currentChar = this.text[this.index++];
  };

  generateTokens = () => {
    while (this.currentChar !== undefined) {
      if (LexerConstants.WHITESPACE.includes(this.currentChar)) {
        /* Whitespaces */
        this.advance();
      } else if (
        this.currentChar === LexerConstants.DECIMAL ||
        LexerConstants.DIGITS.includes(this.currentChar)
      ) {
        /* Number */
        this.tokens.push(this.generateNumber());
      } else if (this.currentChar === OperatorConstants.LPAREN) {
        /* Left Parenthesis */
        this.advance();
        this.tokens.push(
          new Token(TokenConstants.LPAREN, OperatorConstants.LPAREN)
        );
      } else if (this.currentChar === OperatorConstants.RPAREN) {
        /* Right Parenthesis */
        this.advance();
        this.tokens.push(
          new Token(TokenConstants.RPAREN, OperatorConstants.RPAREN)
        );
      } else if (this.currentChar === OperatorConstants.PLUS) {
        /* Plus */
        this.advance();
        this.tokens.push(
          new Token(TokenConstants.PLUS, OperatorConstants.PLUS)
        );
      } else if (this.currentChar === OperatorConstants.MINUS) {
        /* Minus */
        this.advance();
        this.tokens.push(
          new Token(TokenConstants.MINUS, OperatorConstants.MINUS)
        );
      } else if (this.currentChar === OperatorConstants.MULTIPLY) {
        this.advance();
        if (this.currentChar === OperatorConstants.MULTIPLY) {
          /* Pow */
          this.advance();
          this.tokens.push(
            new Token(TokenConstants.POW, OperatorConstants.POW)
          );
        } else {
          /* Multiply */
          this.tokens.push(
            new Token(TokenConstants.MULTIPLY, OperatorConstants.MULTIPLY)
          );
        }
      } else if (this.currentChar === OperatorConstants.DIVIDE) {
        this.advance();
        if (this.currentChar === OperatorConstants.DIVIDE) {
          /* Integer Divide */
          this.advance();
          this.tokens.push(
            new Token(TokenConstants.INT_DIVIDE, OperatorConstants.INT_DIVIDE)
          );
        } else {
          /* Divide */
          this.tokens.push(
            new Token(TokenConstants.DIVIDE, OperatorConstants.DIVIDE)
          );
        }
      } else if (this.currentChar === OperatorConstants.MODULO) {
        /* Mod */
        this.advance();
        this.tokens.push(
          new Token(TokenConstants.MODULO, OperatorConstants.MODULO)
        );
      } else {
        throw new Error("Illegal Character Detected...");
      }
    }

    return this.tokens;
  };

  generateNumber = () => {
    let currentNumberString = "";
    let decimalPointCount = 0;

    const currentDigits = [this.currentChar];

    this.advance();

    while (
      this.currentChar !== undefined &&
      (this.currentChar === LexerConstants.DECIMAL ||
        LexerConstants.DIGITS.includes(this.currentChar))
    ) {
      if (this.currentChar === LexerConstants.DECIMAL) {
        decimalPointCount++;
        if (decimalPointCount > 1) {
          throw new Error("More Than 1 Decimal Point Detected...");
        }
      }

      currentDigits.push(this.currentChar);
      this.advance();
    }

    if (currentDigits[0] === LexerConstants.DECIMAL) {
      currentDigits.unshift("0");
      decimalPointCount++;
    } else if (
      currentDigits[currentDigits.length - 1] === LexerConstants.DECIMAL
    ) {
      currentDigits.push("0");
    }

    currentNumberString = currentDigits.join("");

    return new Token(
      TokenConstants.NUMBER,
      decimalPointCount === 0
        ? parseInt(currentNumberString)
        : parseFloat(currentNumberString)
    );
  };
}

export default Lexer;
