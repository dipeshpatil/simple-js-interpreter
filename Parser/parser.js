const Token = require("../Lexer/token");
const Node = require("./nodes");

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
        this.currentToken = undefined;
        this.advance();
    }

    advance() {
        try {
            this.currentToken = this.tokens[this.index++];
        } catch (e) {
            console.log(e);
            this.currentToken = undefined;
        }
    }

    raiseError() {
        throw new Error("Invalid Syntax");
    }

    parse() {
        if (this.currentToken === undefined) return undefined;
        let result = this.expr();
        if (this.currentToken !== undefined) this.raiseError();

        return result;
    }

    expr() {
        let result = this.term();

        while (
            this.currentToken !== undefined &&
            [Token.PLUS, Token.MINUS].includes(this.currentToken.TokenType)
        ) {
            if (this.currentToken.TokenType === Token.PLUS) {
                this.advance();
                result = {
                    nodeType: Node.ADD,
                    node1: result,
                    node2: this.term(),
                };
            } else if (this.currentToken.TokenType === Token.MINUS) {
                this.advance();
                result = {
                    nodeType: Node.SUB,
                    node1: result,
                    node2: this.term(),
                };
            }
        }

        return result;
    }

    term() {
        let result = this.factor();

        while (
            this.currentToken !== undefined &&
            [
                Token.MULTIPLY,
                Token.DIVIDE,
                Token.MOD,
                Token.INT_DIVIDE,
                Token.POW,
                Token.NTHROOT,
                Token.LOGNBASEX,
            ].includes(this.currentToken.TokenType)
        ) {
            if (this.currentToken.TokenType === Token.MULTIPLY) {
                this.advance();
                result = {
                    nodeType: Node.MUL,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.TokenType === Token.DIVIDE) {
                this.advance();
                result = {
                    nodeType: Node.DIV,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.TokenType === Token.MOD) {
                this.advance();
                result = {
                    nodeType: Node.MOD,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.TokenType === Token.INT_DIVIDE) {
                this.advance();
                result = {
                    nodeType: Node.INT_DIVIDE,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.TokenType === Token.POW) {
                this.advance();
                result = {
                    nodeType: Node.POW,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.TokenType === Token.NTHROOT) {
                this.advance();
                result = {
                    nodeType: Node.NTHROOT,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.TokenType === Token.LOGNBASEX) {
                this.advance();
                result = {
                    nodeType: Node.LOGNBASEX,
                    node1: result,
                    node2: this.factor(),
                };
            }
        }

        return result;
    }

    factor() {
        if (this.currentToken.TokenType === Token.LPAREN) {
            this.advance();
            let result = this.expr();
            if (this.currentToken.TokenType !== Token.RPAREN) this.raiseError();
            this.advance();

            return result;
        } else if (this.currentToken.TokenType === Token.NUMBER) {
            let value = this.currentToken.TokenValue;
            this.advance();
            return {
                nodeType: Node.NUMBER,
                value: value,
            };
        } else if (this.currentToken.TokenType === Token.BINARY_STRING) {
            let value = this.currentToken.TokenValue;
            this.advance();
            return {
                nodeType: Node.BINARY_STRING,
                value: value,
            };
        } else if (this.currentToken.TokenType === Token.HEXADECIMAL_STRING) {
            let value = this.currentToken.TokenValue;
            this.advance();
            return {
                nodeType: Node.HEXADECIMAL_STRING,
                value: value,
            };
        } else if (this.currentToken.TokenType === Token.OCTAL_STRING) {
            let value = this.currentToken.TokenValue;
            this.advance();
            return {
                nodeType: Node.OCTAL_STRING,
                value: value,
            };
        } else if (this.currentToken.TokenType === Token.PLUS) {
            this.advance();
            return {
                nodeType: Node.PLUS,
                node: this.factor(),
            };
        } else if (this.currentToken.TokenType === Token.MINUS) {
            this.advance();
            return {
                nodeType: Node.MINUS,
                node: this.factor(),
            };
        } else if (this.currentToken.TokenType === Token.NAT_LOG) {
            this.advance();
            return {
                nodeType: Node.NAT_LOG,
                node: this.factor(),
            };
        } else if (this.currentToken.TokenType === Token.BINARY) {
            this.advance();
            return {
                nodeType: Node.BINARY,
                node: this.factor(),
            };
        } else if (this.currentToken.TokenType === Token.HEXADECIMAL) {
            this.advance();
            return {
                nodeType: Node.HEXADECIMAL,
                node: this.factor(),
            };
        } else if (this.currentToken.TokenType === Token.OCTAL) {
            this.advance();
            return {
                nodeType: Node.OCTAL,
                node: this.factor(),
            };
        }

        this.raiseError();
    }
}

module.exports = Parser;
