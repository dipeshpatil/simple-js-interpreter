const Token = require("./token");
const Operator = require("./operator");

const TokenType = {
    LPAREN: {
        TokenType: Token.LPAREN,
        TokenValue: Operator.LPAREN,
    },
    RPAREN: {
        TokenType: Token.RPAREN,
        TokenValue: Operator.RPAREN,
    },
    PLUS: {
        TokenType: Token.PLUS,
        TokenValue: Operator.PLUS,
    },
    MINUS: {
        TokenType: Token.MINUS,
        TokenValue: Operator.MINUS,
    },
    MULTIPLY: {
        TokenType: Token.MULTIPLY,
        TokenValue: Operator.MULTIPLY,
    },
    DIVIDE: {
        TokenType: Token.DIVIDE,
        TokenValue: Operator.DIVIDE,
    },
    MOD: {
        TokenType: Token.MOD,
        TokenValue: Operator.MOD,
    },
    POW: {
        TokenType: Token.POW,
        TokenValue: Operator.POW,
    },
    INT_DIVIDE: {
        TokenType: Token.INT_DIVIDE,
        TokenValue: Operator.INT_DIVIDE,
    },
    NTHROOT: {
        TokenType: Token.NTHROOT,
        TokenValue: Operator.NTHROOT,
    },
    LOGNBASEX: {
        TokenType: Token.LOGNBASEX,
        TokenValue: Operator.LOGNBASEX,
    },
    NAT_LOG: {
        TokenType: Token.NAT_LOG,
        TokenValue: Operator.NAT_LOG,
    },
    BINARY_STRING: {
        TokenType: Token.BINARY_STRING,
        TokenValue: Operator.BINARY_STRING,
    },
    BINARY: {
        TokenType: Token.BINARY,
        TokenValue: Operator.BINARY,
    },
    HEXADECIMAL_STRING: {
        TokenType: Token.HEXADECIMAL_STRING,
        TokenValue: Operator.HEXADECIMAL_STRING,
    },
    HEXADECIMAL: {
        TokenType: Token.HEXADECIMAL,
        TokenValue: Operator.HEXADECIMAL,
    },
    OCTAL_STRING: {
        TokenType: Token.OCTAL_STRING,
        TokenValue: Operator.OCTAL_STRING,
    },
    OCTAL: {
        TokenType: Token.OCTAL,
        TokenValue: Operator.OCTAL,
    },
};

module.exports = TokenType;
