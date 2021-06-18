const Operator = require("./operator");
const _Token = require("./token");

const WHITESPACE = " \n\t";
const DIGITS = "0123456789";
const BINARY_DIGITS = "01";
const HEXADECIMAL_DIGITS = "0123456789ABCDEF";
const OCTAL_DIGITS = "01234567";

const TT_NUMBER = _Token.NUMBER;
const TT_BINARY_STRING = _Token.BINARY_STRING;
const TT_HEXADECIMAL_STRING = _Token.HEXADECIMAL_STRING;
const TT_OCTAL_STRING = _Token.OCTAL_STRING;
const TT_CONSTANT_E = _Token.E;
const TT_CONSTANT_PI = _Token.PI;
const TT_BINARY = _Token.BINARY;
const TT_HEXADECIMAL = _Token.HEXADECIMAL;
const TT_OCTAL = _Token.OCTAL;
const TT_LPAREN = _Token.LPAREN;
const TT_RPAREN = _Token.RPAREN;
const TT_PLUS = _Token.PLUS;
const TT_MINUS = _Token.MINUS;
const TT_MULTIPLY = _Token.MULTIPLY;
const TT_DIVIDE = _Token.DIVIDE;
const TT_POW = _Token.POW;
const TT_INT_DIVIDE = _Token.INT_DIVIDE;
const TT_MOD = _Token.MOD;
const TT_NTHROOT = _Token.NTHROOT;
const TT_LOGNBASEX = _Token.LOGNBASEX;
const TT_NAT_LOG = _Token.NAT_LOG;
const TT_BITWISE_AND = _Token.BITWISE_AND;
const TT_BITWISE_OR = _Token.BITWISE_OR;

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
                this.tokens.push(new Token(TT_LPAREN, Operator.LPAREN));
            }
            // Right Parenthesis
            else if (this.currentChar === Operator.RPAREN) {
                this.advance();
                this.tokens.push(new Token(TT_RPAREN, Operator.RPAREN));
            }
            // Plus
            else if (this.currentChar === Operator.PLUS) {
                this.advance();
                this.tokens.push(new Token(TT_PLUS, Operator.PLUS));
            }
            // Minus
            else if (this.currentChar === Operator.MINUS) {
                this.advance();
                this.tokens.push(new Token(TT_MINUS, Operator.MINUS));
            }
            // Multiply
            else if (this.currentChar === Operator.MULTIPLY) {
                this.advance();
                if (this.currentChar === Operator.MULTIPLY) {
                    this.advance();
                    this.tokens.push(new Token(TT_POW, Operator.POW));
                } else
                    this.tokens.push(new Token(TT_MULTIPLY, Operator.MULTIPLY));
            }
            // Divide
            else if (this.currentChar === Operator.DIVIDE) {
                this.advance();
                if (this.currentChar === Operator.DIVIDE) {
                    this.advance();
                    this.tokens.push(
                        new Token(TT_INT_DIVIDE, Operator.INT_DIVIDE)
                    );
                } else this.tokens.push(new Token(TT_DIVIDE, Operator.DIVIDE));
            }
            // Mod
            else if (this.currentChar === Operator.MOD) {
                this.advance();
                this.tokens.push(new Token(TT_MOD, Operator.MOD));
            }
            // Nth Root
            else if (this.currentChar === Operator.NTHROOT) {
                this.advance();
                this.tokens.push(new Token(TT_NTHROOT, Operator.NTHROOT));
            }
            // Logarithm
            else if (this.currentChar === "L") {
                this.advance();
                // Custom Base
                if (this.currentChar === "B") {
                    this.advance();
                    this.tokens.push(
                        new Token(TT_LOGNBASEX, Operator.LOGNBASEX)
                    );
                }
                // Natural Log
                else if (this.currentChar === "N") {
                    this.advance();
                    this.tokens.push(new Token(TT_NAT_LOG, Operator.NAT_LOG));
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
            // Ocatl String
            else if (this.currentChar === Operator.OCTAL_STRING) {
                this.advance();
                this.tokens.push(this.generateString(Operator.OCTAL));
            }
            // Binary Conversion
            else if (this.currentChar === Operator.BINARY) {
                this.advance();
                this.tokens.push(new Token(TT_BINARY, Operator.BINARY));
            }
            // HexaDecimal Conversion
            else if (this.currentChar === Operator.HEXADECIMAL) {
                this.advance();
                this.tokens.push(
                    new Token(TT_HEXADECIMAL, Operator.HEXADECIMAL)
                );
            }
            // Octal Conversion
            else if (this.currentChar === Operator.OCTAL) {
                this.advance();
                this.tokens.push(new Token(TT_OCTAL, Operator.OCTAL));
            }
            // Constant E
            else if (this.currentChar === Operator.E) {
                this.advance();
                this.tokens.push(new Token(TT_CONSTANT_E, Math.exp(1)));
            }
            // Constant PI
            else if (this.currentChar === Operator.PI.P) {
                this.advance();
                if (this.currentChar === Operator.PI.I) {
                    this.advance();
                    this.tokens.push(new Token(TT_CONSTANT_PI, Math.PI));
                }
            }
            // Bitwise AND
            else if (this.currentChar === Operator.BITWISE_AND) {
                this.advance();
                this.tokens.push(
                    new Token(TT_BITWISE_AND, Operator.BITWISE_AND)
                );
            }
            // Bitwise OR
            else if (this.currentChar === Operator.BITWISE_OR) {
                this.advance();
                this.tokens.push(new Token(TT_BITWISE_OR, Operator.BITWISE_OR));
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
                targetTokenType = TT_BINARY_STRING;
                break;
            case Operator.HEXADECIMAL:
                ACCEPTED_CHARS = HEXADECIMAL_DIGITS.toLowerCase();
                targetTokenType = TT_HEXADECIMAL_STRING;
                break;
            case Operator.OCTAL:
                ACCEPTED_CHARS = OCTAL_DIGITS;
                targetTokenType = TT_OCTAL_STRING;
                break;
            default:
                return;
        }

        var currentString = this.currentChar;
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
        var decimalPointCount = 0;
        var currentNumber = this.currentChar;

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

        return new Token(TT_NUMBER, parseFloat(currentNumber));
    }
}

module.exports = Lexer;
