const WHITESPACE = " \n\t";
const DIGITS = "0123456789";
const STRING_CHAR = "`";
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
            if (WHITESPACE.includes(this.currentChar)) this.advance();
            else if (
                this.currentChar === "." ||
                DIGITS.includes(this.currentChar)
            ) {
                this.tokens.push(this.generateNumber());
            } else if (this.currentChar === Operator.LPAREN) {
                this.advance();
                this.tokens.push(TokenType.LPAREN);
            } else if (this.currentChar === Operator.RPAREN) {
                this.advance();
                this.tokens.push(TokenType.RPAREN);
            } else if (this.currentChar === Operator.PLUS) {
                this.advance();
                this.tokens.push(TokenType.PLUS);
            } else if (this.currentChar === Operator.MINUS) {
                this.advance();
                this.tokens.push(TokenType.MINUS);
            } else if (this.currentChar === Operator.MULTIPLY) {
                this.advance();
                if (this.currentChar === Operator.MULTIPLY) {
                    this.advance();
                    this.tokens.push(TokenType.POW);
                } else this.tokens.push(TokenType.MULTIPLY);
            } else if (this.currentChar === Operator.DIVIDE) {
                this.advance();
                if (this.currentChar === Operator.DIVIDE) {
                    this.advance();
                    this.tokens.push(TokenType.INT_DIVIDE);
                } else this.tokens.push(TokenType.DIVIDE);
            } else if (this.currentChar === Operator.MOD) {
                this.advance();
                this.tokens.push(TokenType.MOD);
            } else if (this.currentChar === Operator.NTHROOT) {
                this.advance();
                this.tokens.push(TokenType.NTHROOT);
            } else if (this.currentChar === "L") {
                this.advance();
                if (this.currentChar === "B") {
                    this.advance();
                    this.tokens.push(TokenType.LOGNBASEX);
                } else if (this.currentChar === "N") {
                    this.advance();
                    this.tokens.push(TokenType.NAT_LOG);
                }
            } else if (this.currentChar === Operator.BINARY_STRING) {
                this.advance();
                this.tokens.push(this.generateBinaryString());
            } else if (this.currentChar === Operator.HEXADECIMAL_STRING) {
                this.advance();
                this.tokens.push(this.generateHexaDecimalString());
            } else if (this.currentChar === Operator.OCTAL_STRING) {
                this.advance();
                this.tokens.push(this.generateOctalString());
            } else if (this.currentChar === Operator.BINARY) {
                this.advance();
                this.tokens.push(TokenType.BINARY);
            } else if (this.currentChar === Operator.HEXADECIMAL) {
                this.advance();
                this.tokens.push(TokenType.HEXADECIMAL);
            } else if (this.currentChar === Operator.OCTAL) {
                this.advance();
                this.tokens.push(TokenType.OCTAL);
            } else if (this.currentChar === Operator.E) {
                this.advance();
                this.tokens.push(TokenType.E);
            } else if (this.currentChar === Operator.P) {
                this.advance();
                if (this.currentChar === Operator.I) {
                    this.advance();
                    this.tokens.push(TokenType.PI);
                }
            }
        }

        return this.tokens;
    }

    generateOctalString() {
        var currentOctalString = this.currentChar;
        this.advance();

        while (
            this.currentChar !== undefined &&
            OCTAL_DIGITS.includes(this.currentChar)
        ) {
            currentOctalString += this.currentChar;
            this.advance();
        }

        return {
            TokenType: Token.OCTAL_STRING,
            TokenValue: currentOctalString,
        };
    }

    generateHexaDecimalString() {
        var currentHexaDecimalString = this.currentChar;
        this.advance();

        while (
            this.currentChar !== undefined &&
            HEXADECIMAL_DIGITS.toLowerCase().includes(this.currentChar)
        ) {
            currentHexaDecimalString += this.currentChar;
            this.advance();
        }

        return {
            TokenType: Token.HEXADECIMAL_STRING,
            TokenValue: currentHexaDecimalString.toUpperCase(),
        };
    }

    generateBinaryString() {
        var currentBinaryString = this.currentChar;
        this.advance();

        while (
            this.currentChar !== undefined &&
            BINARY_DIGITS.includes(this.currentChar)
        ) {
            currentBinaryString += this.currentChar;
            this.advance();
        }

        return {
            TokenType: Token.BINARY_STRING,
            TokenValue: currentBinaryString,
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
