const Node = require("../Parser/nodes");

/*
    {
        nodeType: 'AddNode',
        node1: { nodeType: 'NumberNode', value: 2 },
        node2: { nodeType: 'NumberNode', value: 3 } 
    }
*/

const mathJax = (tree = {}) => {
    if (tree.nodeType === Node.NUMBER) {
        return `${tree.value}`;
    } else if (tree.nodeType === Node.ADD) {
        return `${mathJax(tree.node1)} + ${mathJax(tree.node2)}`;
    } else if (tree.nodeType === Node.SUB) {
        return `${mathJax(tree.node1)} - ${mathJax(tree.node2)}`;
    } else if (tree.nodeType === Node.MUL) {
        return `${mathJax(tree.node1)} * ${mathJax(tree.node2)}`;
    } else if (tree.nodeType === Node.DIV) {
        return `\\frac {${mathJax(tree.node1)}} {${mathJax(tree.node2)}}`;
    } else if (tree.nodeType === Node.LOGNBASEX) {
        return `\\log_${mathJax(tree.node2)} ({${mathJax(tree.node1)}})`;
    } else if (tree.nodeType === Node.NAT_LOG) {
        if (tree.node.nodeType === Node.NUMBER)
            return `\\ln {${mathJax(tree.node)}}`;
        else return `\\ln {(${mathJax(tree.node)})}`;
    } else if (tree.nodeType === Node.NTHROOT) {
        if (tree.node2.nodeType !== Node.NUMBER) {
            return `\\sqrt[${mathJax(tree.node2)}]{(${mathJax(tree.node1)})}`;
        } else {
            if (tree.node2.value === 2) {
                return `\\sqrt{${mathJax(tree.node1)}}`;
            } else {
                return `\\sqrt[${mathJax(tree.node2)}]{(${mathJax(
                    tree.node1
                )})}`;
            }
        }
    }
};

module.exports = mathJax;
