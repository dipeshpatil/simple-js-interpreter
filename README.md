```js
Expression
(`b10` * `b1000` + `b10000`) LB 2

Tokens
[
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'BinaryString', TokenValue: '10' },
  { TokenType: 'Multiply', TokenValue: '*' },
  { TokenType: 'BinaryString', TokenValue: '1000' },
  { TokenType: 'Plus', TokenValue: '+' },
  { TokenType: 'BinaryString', TokenValue: '10000' },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'LogNBaseX', TokenValue: 'LB' },
  { TokenType: 'Number', TokenValue: 2 }
]

Tree
{
  nodeType: 'LogNBaseXNode',
  node1: {
    nodeType: 'AddNode',
    node1: {
      nodeType: 'MultiplyNode',
      node1: { nodeType: 'BinaryStringNode', value: '10' },
      node2: { nodeType: 'BinaryStringNode', value: '1000' }
    },
    node2: { nodeType: 'BinaryStringNode', value: '10000' }
  },
  node2: { nodeType: 'NumberNode', value: 2 }
}

Evaluated Result
5
```
