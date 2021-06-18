const Operator = {
    LPAREN: "(",
    RPAREN: ")",
    PLUS: "+",
    MINUS: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
    MOD: "%",
    POW: "**",
    INT_DIVIDE: "//",
    NTHROOT: "#",
    LOGNBASEX: "LB",
    NAT_LOG: "LN",
    BINARY_STRING: "b",
    BINARY: "B",
    OCTAL_STRING: "o",
    OCTAL: "O",
    HEXADECIMAL_STRING: "h",
    HEXADECIMAL: "H",
    E: "e",
    PI: {
        P: "p",
        I: "i",
    },
    // Bitwise Operators
    BITWISE_AND: "&",
    BITWISE_OR: "|",
};

module.exports = Operator;
