const Node = require("../Parser/nodes");

function intDivide(a, b) {
    var result = a / b;
    if (result >= 0) return Math.floor(result);
    else return Math.ceil(result);
}

function pow(a, b) {
    return Math.pow(a, b);
}

function nthRoot(a, b) {
    return pow(a, 1 / b);
}

function logNBaseX(n, x) {
    return Math.log(n) / Math.log(x);
}

function evaluate(tree) {
    if (tree.nodeType === Node.NUMBER) {
        return tree.value;
    } else if (tree.nodeType === Node.ADD) {
        return evaluate(tree.node1) + evaluate(tree.node2);
    } else if (tree.nodeType === Node.SUB) {
        return evaluate(tree.node1) - evaluate(tree.node2);
    } else if (tree.nodeType === Node.MUL) {
        return evaluate(tree.node1) * evaluate(tree.node2);
    } else if (tree.nodeType === Node.DIV) {
        return evaluate(tree.node1) / evaluate(tree.node2);
    } else if (tree.nodeType === Node.MOD) {
        return evaluate(tree.node1) % evaluate(tree.node2);
    } else if (tree.nodeType === Node.POW) {
        return pow(evaluate(tree.node1), evaluate(tree.node2));
    } else if (tree.nodeType === Node.INT_DIVIDE) {
        return intDivide(evaluate(tree.node1), evaluate(tree.node2));
    } else if (tree.nodeType === Node.NTHROOT) {
        return nthRoot(evaluate(tree.node1), evaluate(tree.node2));
    } else if (tree.nodeType === Node.LOGNBASEX) {
        return logNBaseX(evaluate(tree.node1), evaluate(tree.node2));
    }
}

module.exports = evaluate;
