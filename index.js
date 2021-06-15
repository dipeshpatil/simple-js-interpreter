const util = require("util");

const Lexer = require("./Lexer/lexer");
const Parser = require("./Parser/parser");
const Evaluate = require("./Evaluator/evaluate");
const Order = require("./Evaluator/order");

const text = "B(`o7` + `o1`)";

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

console.log("Evaluated Result\n" + Evaluate(tree));
// console.log("\nOrder of Evaluation\n" + Order(tree) + " => " + Evaluate(tree));
