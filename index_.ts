import Lexer from "./new/Lexer";

const text = "(123 + 456 - 789 / 123 ** 1 // 12 % 27)";
const lexer = new Lexer(text);

const tokens = lexer.generateTokens();

console.log(tokens);
