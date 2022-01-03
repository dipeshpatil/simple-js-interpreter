import Lexer from "./Lexer/Lexer.js";

const text = "1 + 1";
const tokens = new Lexer(text).generateTokens();

console.log(tokens);
