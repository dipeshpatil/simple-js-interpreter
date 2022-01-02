import Lexer from "./new/Lexer";

const text = "123";
const lexer = new Lexer(text);

const tokens = lexer.generateTokens();

console.log(tokens);
