const WHITESPACE = " \n\t";
const DIGITS = "0123456789";
const BINARY_DIGITS = "01";
const HEXADECIMAL_DIGITS = DIGITS + "ABCDEF";
const OCTAL_DIGITS = "01234567";

const TokenType = require("./tokenType");
const Operator = require("./operator");
const Token = require("./token");

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
                this.tokens.push(TokenType.LPAREN);
            }
            // Right Parenthesis
            else if (this.currentChar === Operator.RPAREN) {
                this.advance();
                this.tokens.push(TokenType.RPAREN);
            }
            // Plus
            else if (this.currentChar === Operator.PLUS) {
                this.advance();
                this.tokens.push(TokenType.PLUS);
            }
            // Minus
            else if (this.currentChar === Operator.MINUS) {
                this.advance();
                this.tokens.push(TokenType.MINUS);
            }
            // Multiply
            else if (this.currentChar === Operator.MULTIPLY) {
                this.advance();
                if (this.currentChar === Operator.MULTIPLY) {
                    this.advance();
                    this.tokens.push(TokenType.POW);
                } else this.tokens.push(TokenType.MULTIPLY);
            }
            // Divide
            else if (this.currentChar === Operator.DIVIDE) {
                this.advance();
                if (this.currentChar === Operator.DIVIDE) {
                    this.advance();
                    this.tokens.push(TokenType.INT_DIVIDE);
                } else this.tokens.push(TokenType.DIVIDE);
            }
            // Mod
            else if (this.currentChar === Operator.MOD) {
                this.advance();
                this.tokens.push(TokenType.MOD);
            }
            // Nth Root
            else if (this.currentChar === Operator.NTHROOT) {
                this.advance();
                this.tokens.push(TokenType.NTHROOT);
            }
            // Logarithm
            else if (this.currentChar === "L") {
                this.advance();
                // Custom Base
                if (this.currentChar === "B") {
                    this.advance();
                    this.tokens.push(TokenType.LOGNBASEX);
                }
                // Natural Log
                else if (this.currentChar === "N") {
                    this.advance();
                    this.tokens.push(TokenType.NAT_LOG);
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
                this.tokens.push(TokenType.BINARY);
            }
            // HexaDecimal Conversion
            else if (this.currentChar === Operator.HEXADECIMAL) {
                this.advance();
                this.tokens.push(TokenType.HEXADECIMAL);
            }
            // Octal Conversion
            else if (this.currentChar === Operator.OCTAL) {
                this.advance();
                this.tokens.push(TokenType.OCTAL);
            }
            // Constant E
            else if (this.currentChar === Operator.E) {
                this.advance();
                this.tokens.push(TokenType.E);
            }
            // COnstant PI
            else if (this.currentChar === Operator.P) {
                this.advance();
                if (this.currentChar === Operator.I) {
                    this.advance();
                    this.tokens.push(TokenType.PI);
                }
            }
            // Bitwise AND
            else if (this.currentChar === Operator.BITWISE_AND) {
                this.advance();
                this.tokens.push(TokenType.BITWISE_AND);
            }
            // Bitwise OR
            else if (this.currentChar === Operator.BITWISE_OR) {
                this.advance();
                this.tokens.push(TokenType.BITWISE_OR);
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
                targetTokenType = Token.BINARY_STRING;
                break;
            case Operator.HEXADECIMAL:
                ACCEPTED_CHARS = HEXADECIMAL_DIGITS;
                targetTokenType = Token.HEXADECIMAL_STRING;
                break;
            case Operator.OCTAL:
                ACCEPTED_CHARS = OCTAL_DIGITS;
                targetTokenType = Token.OCTAL_STRING;
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

        return {
            TokenType: targetTokenType,
            TokenValue:
                TYPE === Operator.HEXADECIMAL
                    ? currentString.toUpperCase()
                    : currentString,
        };
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

        return {
            TokenType: Token.NUMBER,
            TokenValue: parseFloat(currentNumber),
        };
    }
}

module.exports = Lexer;
