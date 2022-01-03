import Node from "./Node.js";

class OneChildNode extends Node {
  constructor(type, value) {
    super(type);

    this.type = type;
    this.value = value;
  }
}

export default OneChildNode;
