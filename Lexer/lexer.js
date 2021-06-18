const Operator = require("./operator");
const _Token = require("./token");

const WHITESPACE = " \n\t";
const DIGITS = "0123456789";
const BINARY_DIGITS = "01";
const HEXADECIMAL_DIGITS = "0123456789ABCDEF";
const OCTAL_DIGITS = "01234567";

class Token {
    constructor(TokenType, TokenValue = undefined) {
        this.TokenType = TokenType;
        this.TokenValue = TokenValue;
    }
}

class Lexer {
    constructor(text) {
        this.currentChar = "";
        this.index = 0;
        this.text = text;
        this.tokens = [];

        this.advance();
    }

    advance() {
        try {
            this.currentChar = this.text[this.index++];
        } catch (e) {
            console.log(e);
            this.currentChar = undefined;
        }
    }

    generateTokens() {
        while (this.currentChar !== undefined) {
            // Whitespaces
            if (WHITESPACE.includes(this.currentChar)) this.advance();
            // Decimal and Integers
            else if (
                this.currentChar === "." ||
                DIGITS.includes(this.currentChar)
            ) {
                this.tokens.push(this.generateNumber());
            }
            // Left Parenthesis
            else if (this.currentChar === Operator.LPAREN) {
                this.advance();
                this.tokens.push(new Token(_Token.LPAREN, Operator.LPAREN));
            }
            // Right Parenthesis
            else if (this.currentChar === Operator.RPAREN) {
                this.advance();
                this.tokens.push(new Token(_Token.RPAREN, Operator.RPAREN));
            }
            // Plus
            else if (this.currentChar === Operator.PLUS) {
                this.advance();
                this.tokens.push(new Token(_Token.PLUS, Operator.PLUS));
            }
            // Minus
            else if (this.currentChar === Operator.MINUS) {
                this.advance();
                this.tokens.push(new Token(_Token.MINUS, Operator.MINUS));
            }
            // Multiply
            else if (this.currentChar === Operator.MULTIPLY) {
                this.advance();
                // Pow
                if (this.currentChar === Operator.MULTIPLY) {
                    this.advance();
                    this.tokens.push(new Token(_Token.POW, Operator.POW));
                } else
                    this.tokens.push(
                        new Token(_Token.MULTIPLY, Operator.MULTIPLY)
                    );
            }
            // Divide
            else if (this.currentChar === Operator.DIVIDE) {
                this.advance();
                // Integer Divide
                if (this.currentChar === Operator.DIVIDE) {
                    this.advance();
                    this.tokens.push(
                        new Token(_Token.INT_DIVIDE, Operator.INT_DIVIDE)
                    );
                } else
                    this.tokens.push(new Token(_Token.DIVIDE, Operator.DIVIDE));
            }
            // Mod
            else if (this.currentChar === Operator.MOD) {
                this.advance();
                this.tokens.push(new Token(_Token.MOD, Operator.MOD));
            }
            // Nth Root
            else if (this.currentChar === Operator.NTHROOT) {
                this.advance();
                this.tokens.push(new Token(_Token.NTHROOT, Operator.NTHROOT));
            }
            // Logarithm
            else if (this.currentChar === "L") {
                this.advance();
                // Custom Base
                if (this.currentChar === "B") {
                    this.advance();
                    this.tokens.push(
                        new Token(_Token.LOGNBASEX, Operator.LOGNBASEX)
                    );
                }
                // Natural Log
                else if (this.currentChar === "N") {
                    this.advance();
                    this.tokens.push(
                        new Token(_Token.NAT_LOG, Operator.NAT_LOG)
                    );
                }
            }
            // Binary String
            else if (this.currentChar === Operator.BINARY_STRING) {
                this.advance();
                this.tokens.push(this.generateString(Operator.BINARY));
            }
            // HexaDecimal String
            else if (this.currentChar === Operator.HEXADECIMAL_STRING) {
                this.advance();
                this.tokens.push(this.generateString(Operator.HEXADECIMAL));
            }
            // Octal String
            else if (this.currentChar === Operator.OCTAL_STRING) {
                this.advance();
                this.tokens.push(this.generateString(Operator.OCTAL));
            }
            // Binary Conversion
            else if (this.currentChar === Operator.BINARY) {
                this.advance();
                this.tokens.push(new Token(_Token.BINARY, Operator.BINARY));
            }
            // HexaDecimal Conversion
            else if (this.currentChar === Operator.HEXADECIMAL) {
                this.advance();
                this.tokens.push(
                    new Token(_Token.HEXADECIMAL, Operator.HEXADECIMAL)
                );
            }
            // Octal Conversion
            else if (this.currentChar === Operator.OCTAL) {
                this.advance();
                this.tokens.push(new Token(_Token.OCTAL, Operator.OCTAL));
            }
            // Constant E
            else if (this.currentChar === Operator.E) {
                this.advance();
                this.tokens.push(new Token(_Token.E, Math.exp(1)));
            }
            // Constant PI
            else if (this.currentChar === Operator.PI.P) {
                this.advance();
                if (this.currentChar === Operator.PI.I) {
                    this.advance();
                    this.tokens.push(new Token(_Token.PI, Math.PI));
                }
            }
            // Bitwise AND
            else if (this.currentChar === Operator.BITWISE_AND) {
                this.advance();
                this.tokens.push(
                    new Token(_Token.BITWISE_AND, Operator.BITWISE_AND)
                );
            }
            // Bitwise OR
            else if (this.currentChar === Operator.BITWISE_OR) {
                this.advance();
                this.tokens.push(
                    new Token(_Token.BITWISE_OR, Operator.BITWISE_OR)
                );
            }
        }

        return this.tokens;
    }

    generateString(TYPE) {
        let ACCEPTED_CHARS = "";
        let targetTokenType = "";

        switch (TYPE) {
            case Operator.BINARY:
                ACCEPTED_CHARS = BINARY_DIGITS;
                targetTokenType = _Token.BINARY_STRING;
                break;
            case Operator.HEXADECIMAL:
                ACCEPTED_CHARS = HEXADECIMAL_DIGITS.toLowerCase();
                targetTokenType = _Token.HEXADECIMAL_STRING;
                break;
            case Operator.OCTAL:
                ACCEPTED_CHARS = OCTAL_DIGITS;
                targetTokenType = _Token.OCTAL_STRING;
                break;
            default:
                return;
        }

        let currentString = this.currentChar;
        this.advance();

        while (
            this.currentChar !== undefined &&
            ACCEPTED_CHARS.includes(this.currentChar)
        ) {
            currentString += this.currentChar;
            this.advance();
        }

        return new Token(
            targetTokenType,
            TYPE === Operator.HEXADECIMAL
                ? currentString.toUpperCase()
                : currentString
        );
    }

    generateNumber() {
        let decimalPointCount = 0;
        let currentNumber = this.currentChar;

        this.advance();

        while (
            this.currentChar !== undefined &&
            (this.currentChar === "." || DIGITS.includes(this.currentChar))
        ) {
            if (this.currentChar === ".") {
                decimalPointCount++;
                if (decimalPointCount > 1) break;
            }

            currentNumber += this.currentChar;
            this.advance();
        }

        if (currentNumber.startsWith(".")) currentNumber = "0" + currentNumber;
        if (currentNumber.endsWith(".")) currentNumber += "0";

        return new Token(
            _Token.NUMBER,
            decimalPointCount === 0
                ? parseInt(currentNumber)
                : parseFloat(currentNumber)
        );
    }
}

module.exports = Lexer;
