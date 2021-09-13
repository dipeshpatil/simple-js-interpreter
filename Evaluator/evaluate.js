const NODE = require("../constants/nodeType")

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
    // Number
    if (tree.nodeType === NODE.TYPE.NUMBER) {
        return tree.value;
    }
    // Binary String
    else if (tree.nodeType === NODE.TYPE.BINARY_STRING) {
        return convertBinaryToDecimal(tree.value);
    }
    // HexaDecimal String
    else if (tree.nodeType === NODE.TYPE.HEXADECIMAL_STRING) {
        return convertHexaDecimalToDecimal(tree.value);
    }
    // Octal String
    else if (tree.nodeType === NODE.TYPE.OCTAL_STRING) {
        return convertOctalToDecimal(tree.value);
    }
    // Add Node
    else if (tree.nodeType === NODE.TYPE.ADD) {
        return evaluate(tree.node1) + evaluate(tree.node2);
    }
    // Sub Node
    else if (tree.nodeType === NODE.TYPE.SUB) {
        return evaluate(tree.node1) - evaluate(tree.node2);
    }
    // Mul Node
    else if (tree.nodeType === NODE.TYPE.MULTIPLY) {
        return evaluate(tree.node1) * evaluate(tree.node2);
    }
    // Div Node
    else if (tree.nodeType === NODE.TYPE.DIVIDE) {
        return evaluate(tree.node1) / evaluate(tree.node2);
    }
    // Mod Node
    else if (tree.nodeType === NODE.TYPE.MOD) {
        return evaluate(tree.node1) % evaluate(tree.node2);
    }
    // Pow Node
    else if (tree.nodeType === NODE.TYPE.POW) {
        return pow(evaluate(tree.node1), evaluate(tree.node2));
    }
    // Int Divide Node
    else if (tree.nodeType === NODE.TYPE.INT_DIVIDE) {
        return intDivide(evaluate(tree.node1), evaluate(tree.node2));
    }
    // NTH Root Node
    else if (tree.nodeType === NODE.TYPE.NTH_ROOT) {
        return nthRoot(evaluate(tree.node1), evaluate(tree.node2));
    }
    // Log Base Node
    else if (tree.nodeType === NODE.TYPE.LOGNBASEX) {
        return logNBaseX(evaluate(tree.node1), evaluate(tree.node2));
    }
    // Natural Log Node
    else if (tree.nodeType === NODE.TYPE.NAT_LOG) {
        return naturalLog(evaluate(tree.node));
    }
    // Binary Conversion Node
    else if (tree.nodeType === NODE.TYPE.BINARY) {
        return `b${convertDecimalToBinary(evaluate(tree.node))}`;
    }
    // HexaDecimal Conversion Node
    else if (tree.nodeType === NODE.TYPE.HEXADECIMAL) {
        return `h${convertDecimalToHexaDecimal(
            evaluate(tree.node)
        ).toUpperCase()}`;
    }
    // Octal Conversion Node
    else if (tree.nodeType === NODE.TYPE.OCTAL) {
        return `o${convertDecimalToOctal(evaluate(tree.node))}`;
    }
    // Bitwise And Node
    else if (tree.nodeType === NODE.TYPE.BITWISE_AND) {
        return evaluate(tree.node1) & evaluate(tree.node2);
    }
    // Bitwise Or Node
    else if (tree.nodeType === NODE.TYPE.BITWISE_OR) {
        return evaluate(tree.node1) | evaluate(tree.node2);
    }
}

module.exports = evaluate;
