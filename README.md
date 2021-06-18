```js
Expression
((((((1 + 2) * 3 + (4 / 2)) ** 2) + 7) LB 2) + 3) * pi

Tokens
[
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'Number', TokenValue: 1 },
  { TokenType: 'Plus', TokenValue: '+' },
  { TokenType: 'Number', TokenValue: 2 },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'Multiply', TokenValue: '*' },
  { TokenType: 'Number', TokenValue: 3 },
  { TokenType: 'Plus', TokenValue: '+' },
  { TokenType: 'LParen', TokenValue: '(' },
  { TokenType: 'Number', TokenValue: 4 },
  { TokenType: 'Divide', TokenValue: '/' },
  { TokenType: 'Number', TokenValue: 2 },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'Pow', TokenValue: '**' },
  { TokenType: 'Number', TokenValue: 2 },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'Plus', TokenValue: '+' },
  { TokenType: 'Number', TokenValue: 7 },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'LogNBaseX', TokenValue: 'LB' },
  { TokenType: 'Number', TokenValue: 2 },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'Plus', TokenValue: '+' },
  { TokenType: 'Number', TokenValue: 3 },
  { TokenType: 'RParen', TokenValue: ')' },
  { TokenType: 'Multiply', TokenValue: '*' },
  { TokenType: 'Number', TokenValue: 3.141592653589793 }
]

Tree
{
  nodeType: 'MultiplyNode',
  node1: {
    nodeType: 'AddNode',
    node1: {
      nodeType: 'LogNBaseXNode',
      node1: {
        nodeType: 'AddNode',
        node1: {
          nodeType: 'PowNode',
          node1: {
            nodeType: 'AddNode',
            node1: {
              nodeType: 'MultiplyNode',
              node1: {
                nodeType: 'AddNode',
                node1: { nodeType: 'NumberNode', value: 1 },
                node2: { nodeType: 'NumberNode', value: 2 }
              },
              node2: { nodeType: 'NumberNode', value: 3 }
            },
            node2: {
              nodeType: 'DivideNode',
              node1: { nodeType: 'NumberNode', value: 4 },
              node2: { nodeType: 'NumberNode', value: 2 }
            }
          },
          node2: { nodeType: 'NumberNode', value: 2 }
        },
        node2: { nodeType: 'NumberNode', value: 7 }
      },
      node2: { nodeType: 'NumberNode', value: 2 }
    },
    node2: { nodeType: 'NumberNode', value: 3 }
  },
  node2: { nodeType: 'NumberNode', value: 3.141592653589793 }
}

Order Of Evaluation => ((((((((1 + 2) * 3) + (4 / 2)) ** 2) + 7) LB 2) + 3) * 3.141592653589793)

Evaluated Result
31.41592653589793
```
