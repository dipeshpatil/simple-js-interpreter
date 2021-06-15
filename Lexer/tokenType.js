const TokenType = {
    LPAREN: {
        TokenType: "LParen",
        TokenValue: "(",
    },
    RPAREN: {
        TokenType: "RParen",
        TokenValue: ")",
    },
    PLUS: {
        TokenType: "Plus",
        TokenValue: "+",
    },
    MINUS: {
        TokenType: "Minus",
        TokenValue: "-",
    },
    MULTIPLY: {
        TokenType: "Multiply",
        TokenValue: "*",
    },
    DIVIDE: {
        TokenType: "Divide",
        TokenValue: "/",
    },
    MOD: {
        TokenType: "Mod",
        TokenValue: "%",
    },
    POW: {
        TokenType: "Pow",
        TokenValue: "**",
    },
    INT_DIVIDE: {
        TokenType: "IntDivide",
        TokenValue: "//",
    },
    NTHROOT: {
        TokenType: "NTHRoot",
        TokenValue: "#",
    },
    LOGNBASEX: {
        TokenType: "LogNBaseX",
        TokenValue: "LB",
    },
    NAT_LOG: {
        TokenType: "NaturalLog",
        TokenValue: "LN",
    },
    BINARY_STRING: {
        TokenType: "BinaryString",
        TokenValue: "b",
    },
    BINARY: {
        TokenType: "Binary",
        TokenValue: "B",
    },
    HEXADECIMAL_STRING: {
        TokenType: "HexaDecimalString",
        TokenValue: "h",
    },
    HEXADECIMAL: {
        TokenType: "HexaDecimal",
        TokenValue: "H",
    },
    OCTAL_STRING: {
        TokenType: "OctalString",
        TokenValue: "o",
    },
    OCTAL: {
        TokenType: "Octal",
        TokenValue: "O",
    },
};

module.exports = TokenType;
