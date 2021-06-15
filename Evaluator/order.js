const Node = require("./../Parser/nodes");

function orderOfEvaluation(tree = {}) {
    if (tree.nodeType === Node.NUMBER) {
        return tree.value;
    } else if (tree.nodeType === Node.ADD) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " + " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.SUB) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " - " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.MUL) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " * " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.DIV) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " / " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.MOD) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " % " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.POW) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " ** " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.INT_DIVIDE) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " // " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.NTHROOT) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " # " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.LOGNBASEX) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " LB " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.NAT_LOG) {
        return "(" + "LN " + orderOfEvaluation(tree.node) + ")";
    } else if (tree.nodeType === Node.BINARY) {
        return "b(" + orderOfEvaluation(tree.node) + ")";
    } else if (tree.nodeType === Node.DECIMAL) {
        return "d(" + orderOfEvaluation(tree.node) + ")";
    }
}

module.exports = orderOfEvaluation;
