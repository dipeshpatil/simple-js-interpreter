```js
Expression
((81 # 2) ** 2 - 17) LB 2

Tokens
[
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'Number', TokenValue: 81 },
  { TokenType: 'NTHRoot', TokenValue: '#' },
  { TokenType: 'Number', TokenValue: 2 },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'Pow', TokenValue: '**' },
  { TokenType: 'Number', TokenValue: 2 },
  { TokenType: 'Minus', TokenValue: '-' },
  { TokenType: 'Number', TokenValue: 17 },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'LogNBaseX', TokenValue: 'LB' },
  { TokenType: 'Number', TokenValue: 2 }
]

Tree
{
  nodeType: 'LogNBaseXNode',
  node1: {
    nodeType: 'SubNode',
    node1: {
      nodeType: 'PowNode',
      node1: {
        nodeType: 'NthRootNode',
        node1: { nodeType: 'NumberNode', value: 81 },
        node2: { nodeType: 'NumberNode', value: 2 }
      },
      node2: { nodeType: 'NumberNode', value: 2 }
    },
    node2: { nodeType: 'NumberNode', value: 17 }
  },
  node2: { nodeType: 'NumberNode', value: 2 }
}

Order of Evaluation
((((81 # 2) ** 2) - 17) LB 2) => 6
```
