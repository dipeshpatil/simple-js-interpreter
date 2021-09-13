const NODE = require("../constants/nodeType");

function orderOfEvaluation(tree = {}) {
  if (tree.nodeType === NODE.TYPE.NUMBER) {
    return tree.value;
  } else if (tree.nodeType === NODE.TYPE.ADD) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " + " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.SUB) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " - " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.MULTIPLY) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " * " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.DIVIDE) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " / " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.MOD) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " % " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.POW) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " ** " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.INT_DIVIDE) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " // " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.NTH_ROOT) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " # " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.LOGNBASEX) {
    return (
      "(" +
      orderOfEvaluation(tree.node1) +
      " LB " +
      orderOfEvaluation(tree.node2) +
      ")"
    );
  } else if (tree.nodeType === NODE.TYPE.NAT_LOG) {
    return "(" + "LN " + orderOfEvaluation(tree.node) + ")";
  }
}

module.exports = orderOfEvaluation;
