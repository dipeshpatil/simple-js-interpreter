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
	CONVERSION: {
		TokenType: "Conversion",
		TokenValue: "~",
	},
	BINARY: {
		TokenType: "Binary",
		TokenValue: "b",
	},
	DECIMAL: {
		TokenType: "Decimal",
		TokenValue: "d",
	},
};

module.exports = TokenType;
