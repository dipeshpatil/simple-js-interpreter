const util = require("util");

const Lexer = require("./Lexer/lexer");
const Parser = require("./Parser/parser");
const Eval = require("./Evaluator/eval");
const Order = require("./Evaluator/order");

const text = "1 + 2 * 3 - 4 * 5 - 6 + 7";

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
console.log("\nOrder of Evaluation\n" + Order(tree) + " => " + Eval(tree));
