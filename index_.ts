import Lexer from "./new/Lexer/Lexer";

const text = "7.";
const lexer = new Lexer(text);

const tokens = lexer.generateTokens();

console.log(tokens);
