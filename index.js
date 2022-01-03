import Lexer from "./Lexer/Lexer.js";
import Parser from "./Parser/Parser.js";

const text = "1 * 2";
const tokens = new Lexer(text).generateTokens();
const parseTree = new Parser(tokens).parseTokens();

console.log(parseTree);
