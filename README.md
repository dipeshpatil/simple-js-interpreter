```js
Expression
1 + 2 * 5 + 11

Tokens
[
  { TokenType: 'Number', TokenValue: 1 },
  { TokenType: 'Plus', TokenValue: '+' },
  { TokenType: 'Number', TokenValue: 2 },
  { TokenType: 'Multiply', TokenValue: '*' },
  { TokenType: 'Number', TokenValue: 5 },
  { TokenType: 'Plus', TokenValue: '+' },
  { TokenType: 'Number', TokenValue: 11 }
]

Parse Tree
{
  nodeType: 'AddNode',
  node1: {
    nodeType: 'AddNode',
    node1: { nodeType: 'NumberNode', value: 1 },
    node2: {
      nodeType: 'MulNode',
      node1: { nodeType: 'NumberNode', value: 2 },
      node2: { nodeType: 'NumberNode', value: 5 }
    }
  },
  node2: { nodeType: 'NumberNode', value: 11 }
}

Order Of Evaluation
((1 + (2 * 5)) + 11) => 22
```
