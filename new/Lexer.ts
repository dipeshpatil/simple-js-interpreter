import Token from "./Token";

enum LexerConstants {
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
      /* Whitespaces */
      if (LexerConstants.WHITESPACE.includes(this.currentChar)) {
        this.advance();
      } else if (
        this.currentChar === "." ||
        LexerConstants.DIGITS.includes(this.currentChar)
      ) {
        this.tokens.push(this.generateNumber());
      }
    }

    return this.tokens;
  };

  generateNumber = () => {
    let currentNumber: string;
    let decimalPointCount = 0;

    const currentDigits = [this.currentChar];

    this.advance();

    while (
      this.currentChar !== undefined &&
      (this.currentChar === "." ||
        LexerConstants.DIGITS.includes(this.currentChar))
    ) {
      if (this.currentChar === ".") {
        decimalPointCount++;
        if (decimalPointCount > 1) {
          break;
        }
      }

      currentDigits.push(this.currentChar);
      this.advance();
    }

    if (currentDigits[0] === ".") {
      currentDigits.unshift("0");
    } else if (currentDigits[currentDigits.length - 1] === ".") {
      currentDigits.push("0");
    }

    currentNumber = currentDigits.join("");

    return new Token(
      "Number",
      decimalPointCount === 0
        ? parseInt(currentNumber)
        : parseFloat(currentNumber)
    );
  };
}

export default Lexer;
