import Lexer from "./Lexer/Lexer.js";

const text = "1 + a";
const tokens = new Lexer(text).generateTokens();

console.log(tokens);
