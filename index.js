const Lexer = require("./Lexer/lexer");

const lexer = new Lexer("123.45");

console.log(lexer.generateTokens());
