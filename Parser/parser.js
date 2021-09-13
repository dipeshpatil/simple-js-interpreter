const Token = require("../Lexer/token");
const Node = require("./nodes");

const TOKEN = require("../constants/tokenType")

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
            [TOKEN.TYPE.PLUS, TOKEN.TYPE.MINUS].includes(this.currentToken.type)
        ) {
            if (this.currentToken.type === TOKEN.TYPE.PLUS) {
                this.advance();
                result = {
                    nodeType: Node.ADD,
                    node1: result,
                    node2: this.term(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.MINUS) {
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
                TOKEN.TYPE.MULTIPLY,
                TOKEN.TYPE.DIVIDE,
                TOKEN.TYPE.MOD,
                TOKEN.TYPE.INT_DIVIDE,
                TOKEN.TYPE.POW,
                TOKEN.TYPE.NTH_ROOT,
                TOKEN.TYPE.LOGNBASEX,
                TOKEN.TYPE.BITWISE_AND,
                TOKEN.TYPE.BITWISE_OR
            ].includes(this.currentToken.type)
        ) {
            if (this.currentToken.type === TOKEN.TYPE.MULTIPLY) {
                this.advance();
                result = {
                    nodeType: Node.MUL,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.DIVIDE) {
                this.advance();
                result = {
                    nodeType: Node.DIV,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.MOD) {
                this.advance();
                result = {
                    nodeType: Node.MOD,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.INT_DIVIDE) {
                this.advance();
                result = {
                    nodeType: Node.INT_DIVIDE,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.POW) {
                this.advance();
                result = {
                    nodeType: Node.POW,
                    node1: result,
                    node2: this.expr(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.NTH_ROOT) {
                this.advance();
                result = {
                    nodeType: Node.NTHROOT,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.LOGNBASEX) {
                this.advance();
                result = {
                    nodeType: Node.LOGNBASEX,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.BITWISE_AND) {
                this.advance();
                result = {
                    nodeType: Node.BITWISE_AND,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.type === TOKEN.TYPE.BITWISE_OR) {
                this.advance();
                result = {
                    nodeType: Node.BITWISE_OR,
                    node1: result,
                    node2: this.factor(),
                };
            }
        }

        return result;
    }

    factor() {
        if (this.currentToken.type === TOKEN.TYPE.LPAREN) {
            this.advance();
            let result = this.expr();
            if (this.currentToken.type !== TOKEN.TYPE.RPAREN) this.raiseError();
            this.advance();

            return result;
        } else if (this.currentToken.type === TOKEN.TYPE.NUMBER) {
            let value = this.currentToken.value;
            this.advance();
            return {
                nodeType: Node.NUMBER,
                value: value,
            };
        } else if (this.currentToken.type === TOKEN.TYPE.BINARY_STRING) {
            let value = this.currentToken.value;
            this.advance();
            return {
                nodeType: Node.BINARY_STRING,
                value: value,
            };
        } else if (this.currentToken.type === TOKEN.TYPE.HEXADECIMAL_STRING) {
            let value = this.currentToken.value;
            this.advance();
            return {
                nodeType: Node.HEXADECIMAL_STRING,
                value: value,
            };
        } else if (this.currentToken.type === TOKEN.TYPE.OCTAL_STRING) {
            let value = this.currentToken.value;
            this.advance();
            return {
                nodeType: Node.OCTAL_STRING,
                value: value,
            };
        } else if (this.currentToken.TokenType === Token.E) {
            this.advance();
            return {
                nodeType: Node.NUMBER,
                value: Math.exp(1),
            };
        } else if (this.currentToken.TokenType === Token.PI) {
            this.advance();
            return {
                nodeType: Node.NUMBER,
                value: Math.PI,
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
        } else if (this.currentToken.type === TOKEN.TYPE.NAT_LOG) {
            this.advance();
            return {
                nodeType: Node.NAT_LOG,
                node: this.factor(),
            };
        } else if (this.currentToken.type === TOKEN.TYPE.BINARY) {
            this.advance();
            return {
                nodeType: Node.BINARY,
                node: this.factor(),
            };
        } else if (this.currentToken.type === TOKEN.TYPE.HEXADECIMAL) {
            this.advance();
            return {
                nodeType: Node.HEXADECIMAL,
                node: this.factor(),
            };
        } else if (this.currentToken.type === TOKEN.TYPE.OCTAL) {
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
