const util = require("util");

const Lexer = require("./Lexer/lexer");
const Parser = require("./Parser/parser");
const Eval = require("./Evaluator/eval");
const Order = require("./Evaluator/order");

const text = "1 + 2 * 5 + 11";

const lexer = new Lexer(text);
const tokens = lexer.generateTokens();

const parser = new Parser(tokens);
const tree = parser.parse();

console.log(text);
console.log(Order(tree) + " => " + Eval(tree));
console.log(tokens);
console.log(util.inspect(tree, { showHidden: false, depth: null }));
