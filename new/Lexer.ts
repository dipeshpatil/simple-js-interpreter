import Token from "./Token/Token";
import TokenConstants from "./Token/TokenConstants";
import OperatorConstants from "./Token/OperatorConstants";

enum LexerConstants {
  DECIMAL = ".",
  WHITESPACE = " \n\t",
  DIGITS = "0123456789",
  BINARY_DIGITS = "01",
  HEXADECIMAL_DIGITS = "0123456789ABCDEF",
  OCTAL_DIGITS = "01234567",
}

interface Lexer {
  text: string;
  index: number;
  currentChar: string | undefined;
  tokens: Token[];

  advance: () => void;
  generateTokens: () => Token[];
  generateNumber: () => Token;
}

class Lexer {
  constructor(text: string) {
    this.text = text;
    this.index = 0;
    this.currentChar = "";
    this.tokens = [];

    this.advance();
  }

  advance = () => {
    try {
      this.currentChar = this.text[this.index++];
    } catch (e) {
      this.currentChar = undefined;
    }
  };

  generateTokens = () => {
    while (this.currentChar !== undefined) {
      if (LexerConstants.WHITESPACE.includes(this.currentChar)) {
        /* Whitespaces */
        this.advance();
      } else if (
        this.currentChar === "." ||
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
      } else if (this.currentChar === OperatorConstants.MOD) {
        /* Mod */
        this.advance();
        this.tokens.push(new Token(TokenConstants.MOD, OperatorConstants.MOD));
      }
    }

    return this.tokens;
  };

  generateNumber = () => {
    let currentNumberString: string;
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
          break;
        }
      }

      currentDigits.push(this.currentChar);
      this.advance();
    }

    if (currentDigits[0] === LexerConstants.DECIMAL) {
      currentDigits.unshift("0");
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
