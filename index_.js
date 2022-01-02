"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer_1 = __importDefault(require("./new/Lexer/Lexer"));
var text = "(12.3 + 456 - 789 / 123 ** 1 // 12 % 27)";
var lexer = new Lexer_1.default(text);
var tokens = lexer.generateTokens();
console.log(tokens);
