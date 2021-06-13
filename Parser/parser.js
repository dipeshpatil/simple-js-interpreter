const Token = require("../Lexer/token");

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
        throw "Invalid Syntax";
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
                    nodeType: "AddNode",
                    node1: result,
                    node2: this.term(),
                };
            } else if (this.currentToken.TokenType === Token.MINUS) {
                this.advance();
                result = {
                    nodeType: "SubNode",
                    node1: result,
                    node2: this.term(),
                };
            }
        }

        return result;
    }

    term() {
        let result = this.factor();
        let token = this.currentToken;

        while (
            token !== undefined &&
            [Token.MULTIPLY, Token.DIVIDE].includes(token.TokenType)
        ) {
            if (token.TokenType === Token.MULTIPLY) {
                this.advance();
                result = {
                    nodeType: "MultiplyNode",
                    node1: result,
                    node2: this.factor(),
                };
            } else if (token.TokenType === Token.DIVIDE) {
                this.advance();
                result = {
                    nodeType: "DivideNode",
                    node1: result,
                    node2: this.factor(),
                };
            }
        }
    }

    factor() {
        let token = this.currentToken;

        if (token.TokenType === Token.LPAREN) {
            this.advance();
            let result = this.expr();
            if (this.currentToken.TokenType !== Token.RPAREN) this.raiseError();
            this.advance();

            return result;
        } else if (
            token.TokenType === Token.NUMBER &&
            token.TokenValue !== undefined
        ) {
            this.advance();
            return {
                nodeType: "NumberNode",
                value: token.TokenValue,
            };
        } else if (token.TokenType === Token.PLUS) {
            this.advance();
            return {
                nodeType: "PlusNode",
                node: this.factor(),
            };
        } else if (token.TokenType === Token.MINUS) {
            this.advance();
            return {
                nodeType: "MinusNode",
                node: this.factor(),
            };
        }
    }
}

module.exports = Parser;
