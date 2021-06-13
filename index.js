const Lexer = require("./Lexer/lexer");
const Parser = require("./Parser/parser");

const lexer = new Lexer("1 + 2 - 3 - 4");
const tokens = lexer.generateTokens();

const parser = new Parser(tokens);
const tree = parser.parse();
console.log(tree);
