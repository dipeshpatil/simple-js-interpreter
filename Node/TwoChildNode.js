import Node from "./Node.js";

class TwoChildNode extends Node {
  constructor(type, nodeOne, nodeTwo) {
    super(type);

    this.type = type;
    this.nodeOne = nodeOne;
    this.nodeTwo = nodeTwo;
  }
}

export default TwoChildNode;
