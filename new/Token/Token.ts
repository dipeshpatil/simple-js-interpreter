type TokenValueType = string | number;
type TokenType = string;

interface Token {
  type: TokenType;
  value: TokenValueType;
}

class Token {
  constructor(type: TokenType, value: TokenValueType) {
    this.type = type;
    this.value = value;
  }
}

export default Token;
