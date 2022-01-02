"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lexer_1 = __importDefault(require("./new/Lexer"));
const text = "(123 + 456 - 789 / 123 ** 1 // 12 % 27)";
const lexer = new Lexer_1.default(text);
const tokens = lexer.generateTokens();
console.log(tokens);
