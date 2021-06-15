const WHITESPACE = " \n\t";
const DIGITS = "0123456789";

const TokenType = require("./tokenType");

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
            } else if (this.currentChar === "+") {
                this.advance();
                this.tokens.push(TokenType.PLUS);
            } else if (this.currentChar === "-") {
                this.advance();
                this.tokens.push(TokenType.MINUS);
            } else if (this.currentChar === "*") {
                this.advance();
                if (this.currentChar === "*") {
                    this.advance();
                    this.tokens.push(TokenType.POW);
                } else this.tokens.push(TokenType.MULTIPLY);
            } else if (this.currentChar === "/") {
                this.advance();
                if (this.currentChar === "/") {
                    this.advance();
                    this.tokens.push(TokenType.INT_DIVIDE);
                } else this.tokens.push(TokenType.DIVIDE);
            } else if (this.currentChar === "%") {
                this.advance();
                this.tokens.push(TokenType.MOD);
            } else if (this.currentChar === "#") {
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
            } else if (this.currentChar === "(") {
                this.advance();
                this.tokens.push(TokenType.LPAREN);
            } else if (this.currentChar === ")") {
                this.advance();
                this.tokens.push(TokenType.RPAREN);
            } else if (this.currentChar === '~') {
                this.advance();
                if (this.currentChar === 'b') {
                    this.advance();
                    this.tokens.push(TokenType.BINARY)
                } else if (this.currentChar === 'd') {
                    this.advance();
                    this.tokens.push(TokenType.DECIMAL)
                }
            }
        }

        return this.tokens;
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
            TokenType: "Number",
            TokenValue: parseFloat(currentNumber),
        };
    }
}

module.exports = Lexer;
