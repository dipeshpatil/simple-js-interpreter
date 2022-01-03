const util = require("util");

const Lexer = require("./Lexer/lexer");
const Parser = require("./Parser/parser");
const Evaluate = require("./Evaluator/evaluate");
const Order = require("./Evaluator/order");

const text = "";
// const text = "O(b100 + b100)";

const lexer = new Lexer(text);
const tokens = lexer.generateTokens();

const parser = new Parser(tokens);
const tree = parser.parse();

console.log("Expression\n" + text + "\n");
console.log("Tokens");
console.log(tokens);
console.log(
  "\nTree\n" + util.inspect(tree, { showHidden: false, depth: null })
);
console.log("\nOrder Of Evaluation => " + Order(tree));
console.log("\nEvaluated Result\n" + Evaluate(tree));
