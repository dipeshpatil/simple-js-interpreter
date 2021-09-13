```js
Expression
((((((1 + 2) * 3 + (4 / 2)) ** 2) + 7) LB 2) + 3) * e * pi

Tokens
[ Token { type: 'TT_LPAREN', value: '(' },
  Token { type: 'TT_LPAREN', value: '(' },
  Token { type: 'TT_LPAREN', value: '(' },
  Token { type: 'TT_LPAREN', value: '(' },
  Token { type: 'TT_LPAREN', value: '(' },
  Token { type: 'TT_LPAREN', value: '(' },
  Token { type: 'TT_NUMBER', value: 1 },
  Token { type: 'TT_PLUS', value: '+' },
  Token { type: 'TT_NUMBER', value: 2 },
  Token { type: 'TT_RPAREN', value: ')' },
  Token { type: 'TT_MULTIPLY', value: '*' },
  Token { type: 'TT_NUMBER', value: 3 },
  Token { type: 'TT_PLUS', value: '+' },
  Token { type: 'TT_LPAREN', value: '(' },
  Token { type: 'TT_NUMBER', value: 4 },
  Token { type: 'TT_DIVIDE', value: '/' },
  Token { type: 'TT_NUMBER', value: 2 },
  Token { type: 'TT_RPAREN', value: ')' },
  Token { type: 'TT_RPAREN', value: ')' },
  Token { type: 'TT_POW', value: '**' },
  Token { type: 'TT_NUMBER', value: 2 },
  Token { type: 'TT_RPAREN', value: ')' },
  Token { type: 'TT_PLUS', value: '+' },
  Token { type: 'TT_NUMBER', value: 7 },
  Token { type: 'TT_RPAREN', value: ')' },
  Token { type: 'TT_LOG_BASE', value: 'LB' },
  Token { type: 'TT_NUMBER', value: 2 },
  Token { type: 'TT_RPAREN', value: ')' },
  Token { type: 'TT_PLUS', value: '+' },
  Token { type: 'TT_NUMBER', value: 3 },
  Token { type: 'TT_RPAREN', value: ')' },
  Token { type: 'TT_MULTIPLY', value: '*' },
  Token { type: 'TT_NUMBER', value: 2.718281828459045 },
  Token { type: 'TT_MULTIPLY', value: '*' },
  Token { type: 'TT_NUMBER', value: 3.141592653589793 } ]

Tree
{ nodeType: 'NT_MULIPLY',
  node1:
   { nodeType: 'NT_MULIPLY',
     node1:
      { nodeType: 'NT_ADD',
        node1:
         { nodeType: 'NT_LOG_BASE',
           node1:
            { nodeType: 'NT_ADD',
              node1:
               { nodeType: 'NT_POW',
                 node1:
                  { nodeType: 'NT_ADD',
                    node1:
                     { nodeType: 'NT_MULIPLY',
                       node1:
                        { nodeType: 'NT_ADD',
                          node1: { nodeType: 'NT_NUMBER', value: 1 },
                          node2: { nodeType: 'NT_NUMBER', value: 2 } },
                       node2: { nodeType: 'NT_NUMBER', value: 3 } },
                    node2:
                     { nodeType: 'NT_DIVIDE',
                       node1: { nodeType: 'NT_NUMBER', value: 4 },
                       node2: { nodeType: 'NT_NUMBER', value: 2 } } },
                 node2: { nodeType: 'NT_NUMBER', value: 2 } },
              node2: { nodeType: 'NT_NUMBER', value: 7 } },
           node2: { nodeType: 'NT_NUMBER', value: 2 } },
        node2: { nodeType: 'NT_NUMBER', value: 3 } },
     node2: { nodeType: 'NT_NUMBER', value: 2.718281828459045 } },
  node2: { nodeType: 'NT_NUMBER', value: 3.141592653589793 } }

Order Of Evaluation => (((((((((1 + 2) * 3) + (4 / 2)) ** 2) + 7) LB 2) + 3) * 2.718281828459045) * 3.141592653589793)

Evaluated Result
85.39734222673566
```
