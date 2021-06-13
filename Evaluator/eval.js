const Node = require('./../Parser/nodes');

function eval(tree = {}) {
    if (tree.nodeType === Node.ADD) {
        return eval(tree.node1) + eval(tree.node2);
    } else if (tree.nodeType === Node.SUB) {
        return eval(tree.node1) - eval(tree.node2);
    } else if (tree.nodeType === Node.MUL) {
        return eval(tree.node1) * eval(tree.node2);
    } else if (tree.nodeType === Node.DIV) {
        return eval(tree.node1) / eval(tree.node2);
    } else if (tree.nodeType === Node.NUMBER) {
        return tree.value;
    }
}

module.exports = eval;