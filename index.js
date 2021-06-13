const util = require("util");

const Lexer = require("./Lexer/lexer");
const Parser = require("./Parser/parser");

const text = "1 + 2 - 3 - 4";

const lexer = new Lexer(text);
const tokens = lexer.generateTokens();

const parser = new Parser(tokens);
const tree = parser.parse();

console.log(text);
console.log(tokens);
console.log(util.inspect(tree, { showHidden: false, depth: null }));
