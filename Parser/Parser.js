import TokenConstants from "../Token/TokenConstants.js";
import NodeConstants from "../Node/NodeConstants.js";
import TwoChildNode from "../Node/TwoChildNode.js";
import OneChildNode from "../Node/OneChildNode.js";

const ParserConstants = {
  INVALID_SYNTAX_ERROR_MSG: "Invalid Syntax...",
};

class Parser {
  constructor(tokens = []) {
    this.tokens = tokens;
    this.index = 0;
    this.currentToken = undefined;

    this.advance();
  }

  advance = () => {
    this.currentToken = this.tokens[this.index++];
  };

  raiseError = (errorMessage) => {
    throw new Error(errorMessage);
  };

  parseTokens = () => {
    if (this.currentToken === undefined) {
      return undefined;
    }

    let result = this.expression();

    if (this.currentToken !== undefined) {
      this.raiseError(ParserConstants.INVALID_SYNTAX_ERROR_MSG);
    }

    return result;
  };

  expression = () => {
    let result = this.term();

    while (
      this.currentToken !== undefined &&
      [TokenConstants.PLUS, TokenConstants.MINUS].includes(
        this.currentToken.type
      )
    ) {
      if (this.currentToken.type === TokenConstants.PLUS) {
        this.advance();
        result = new TwoChildNode(NodeConstants.ADD, result, this.term());
      } else if (this.currentToken.type === TokenConstants.MINUS) {
        this.advance();
        result = new TwoChildNode(NodeConstants.SUB, result, this.term());
      }
    }

    return result;
  };

  term = () => {
    let result = this.factor();

    while (
      this.currentToken !== undefined &&
      [
        TokenConstants.MULTIPLY,
        TokenConstants.DIVIDE,
        TokenConstants.MODULO,
      ].includes(this.currentToken.type)
    ) {
      if (this.currentToken.type === TokenConstants.MULTIPLY) {
        this.advance();
        result = new TwoChildNode(
          NodeConstants.MULTIPLY,
          result,
          this.factor()
        );
      } else if (this.currentToken.type === TokenConstants.DIVIDE) {
        this.advance();
        result = new TwoChildNode(NodeConstants.DIVIDE, result, this.factor());
      } else if (this.currentToken.type === TokenConstants.MODULO) {
        this.advance();
        result = new TwoChildNode(NodeConstants.MODULO, result, this.factor());
      }
    }

    return result;
  };

  factor = () => {
    if (
      this.currentToken !== undefined &&
      this.currentToken.type === TokenConstants.NUMBER
    ) {
      let value = this.currentToken.value;
      this.advance();

      return new OneChildNode(NodeConstants.NUMBER, value);
    }

    this.raiseError(ParserConstants.INVALID_SYNTAX_ERROR_MSG);
  };
}

export default Parser;
