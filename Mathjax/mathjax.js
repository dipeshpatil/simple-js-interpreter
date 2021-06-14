const util = require("util");

const mathJax = require("./mathjax_utils");

const Lexer = require("../Lexer/lexer");
const Parser = require("../Parser/parser");
const Evaluator = require("../Evaluator/evaluate");
const Order = require("../Evaluator/order");

const text = "LN 9 + 128 LB 2";

const tree = new Parser(new Lexer(text).generateTokens()).parse();

console.log(util.inspect(tree, { showHidden: false, depth: null }) + "\n");
console.log(mathJax(tree));
