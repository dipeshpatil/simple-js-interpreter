const NODE = require("../constants/nodeType");
/*
    {
        nodeType: 'AddNode',
        node1: { nodeType: 'NumberNode', value: 2 },
        node2: { nodeType: 'NumberNode', value: 3 } 
    }
*/

const mathJax = (tree = {}) => {
  if (tree.nodeType === NODE.TYPE.NUMBER) {
    return `${tree.value}`;
  } else if (tree.nodeType === NODE.TYPE.ADD) {
    return `${mathJax(tree.node1)} + ${mathJax(tree.node2)}`;
  } else if (tree.nodeType === NODE.TYPE.SUB) {
    return `${mathJax(tree.node1)} - ${mathJax(tree.node2)}`;
  } else if (tree.nodeType === NODE.TYPE.MULTIPLY) {
    return `${mathJax(tree.node1)} * ${mathJax(tree.node2)}`;
  } else if (tree.nodeType === NODE.TYPE.DIVIDE) {
    return `\\frac {${mathJax(tree.node1)}} {${mathJax(tree.node2)}}`;
  } else if (tree.nodeType === NODE.TYPE.LOGNBASEX) {
    return `\\log_${mathJax(tree.node2)} ({${mathJax(tree.node1)}})`;
  } else if (tree.nodeType === NODE.TYPE.NAT_LOG) {
    if (tree.node.nodeType === NODE.TYPE.NUMBER)
      return `\\ln {${mathJax(tree.node)}}`;
    else return `\\ln {(${mathJax(tree.node)})}`;
  } else if (tree.nodeType === NODE.TYPE.NTH_ROOT) {
    if (tree.node2.nodeType !== NODE.TYPE.NUMBER) {
      return `\\sqrt[${mathJax(tree.node2)}]{(${mathJax(tree.node1)})}`;
    } else {
      if (tree.node2.value === 2) {
        return `\\sqrt{${mathJax(tree.node1)}}`;
      } else {
        return `\\sqrt[${mathJax(tree.node2)}]{(${mathJax(tree.node1)})}`;
      }
    }
  }
};

module.exports = mathJax;
