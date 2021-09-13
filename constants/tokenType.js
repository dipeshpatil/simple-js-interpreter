const TOKEN = {
  TYPE: {
    LPAREN: "TT_LPAREN",
    RPAREN: "TT_RPAREN",

    NUMBER: "TT_NUMBER",
    
    PLUS: "TT_PLUS",
    MINUS: "TT_MINUS",
    MULTIPLY: "TT_MULTIPLY",
    DIVIDE: "TT_DIVIDE",
    INT_DIVIDE: "TT_INT_DIVIDE",
    MOD: "TT_MOD",
    
    POW: "TT_POW",
    NTH_ROOT: "TT_NTH_ROOT",
    
    LOGNBASEX: "TT_LOG_BASE",
    NAT_LOG: "TT_NAT_LOG",
    
    BITWISE_AND: "TT_BITWISE_AND",
    BITWISE_OR: "TT_BITWISE_OR",

    BINARY_STRING: "TT_BINARY_STRING",
    HEXADECIMAL_STRING: "TT_HEXADECIMAL_STRING",
    OCTAL_STRING: "TT_OCTAL_STRING",

    BINARY: "TT_BINARY",
    HEXADECIMAL: "TT_HEXADECIMAL",
    OCTAL: "TT_OCTAL"
  },

  OPERATOR: {
    LPAREN: "(",
    RPAREN: ")",
    
    PLUS: "+",
    MINUS: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
    INT_DIVIDE: "//",
    MOD: "%",
    
    POW: "**",
    NTH_ROOT: "#",

    LOGNBASEX: "LB",
    NAT_LOG: "LN",
    
    BITWISE_AND: "&",
    BITWISE_OR: "|",

    BINARY_STRING: "b",
    HEXADECIMAL_STRING: "h",
    OCTAL_STRING: "o",

    BINARY: "B",
    HEXADECIMAL: "H",
    OCTAL: "O"
  }
};

module.exports = TOKEN;
