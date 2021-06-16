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

function naturalLog(n) {
    return Math.log(n);
}

function convertDecimalToBinary(n) {
    return parseInt(n).toString(2);
}

function convertBinaryToDecimal(b) {
    return parseFloat(parseInt(b.toString(), 2).toString());
}

function convertDecimalToHexaDecimal(n) {
    return parseInt(n).toString(16);
}

function convertHexaDecimalToDecimal(b) {
    return parseFloat(parseInt(b.toString(), 16).toString());
}

function convertDecimalToOctal(n) {
    return parseInt(n).toString(8);
}

function convertOctalToDecimal(b) {
    return parseFloat(parseInt(b.toString(), 8).toString());
}

function evaluate(tree) {
    if (tree.nodeType === Node.NUMBER) {
        return tree.value;
    } else if (tree.nodeType === Node.BINARY_STRING) {
        return convertBinaryToDecimal(tree.value);
    } else if (tree.nodeType === Node.HEXADECIMAL_STRING) {
        return convertHexaDecimalToDecimal(tree.value);
    } else if (tree.nodeType === Node.OCTAL_STRING) {
        return convertOctalToDecimal(tree.value);
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
    } else if (tree.nodeType === Node.NAT_LOG) {
        return naturalLog(evaluate(tree.node));
    } else if (tree.nodeType === Node.BINARY) {
        return `\`b${convertDecimalToBinary(evaluate(tree.node))}\``;
    } else if (tree.nodeType === Node.HEXADECIMAL) {
        return convertDecimalToHexaDecimal(evaluate(tree.node)).toUpperCase();
    } else if (tree.nodeType === Node.OCTAL) {
        return convertDecimalToOctal(evaluate(tree.node));
    }
}

module.exports = evaluate;
