export class Styling {
  currentEdgeStyle: any;

  graph: any;

  constructor(graph: any) {
    this.graph = graph;
  }

  /**
   *
   */
  defaultVertexStyle = {};

  /**
   * Contains the default style for edges.
   */
  defaultEdgeStyle = {
    edgeStyle: "orthogonalEdgeStyle",
    rounded: "0",
    jettySize: "auto",
    orthogonalLoop: "1",
  };

  /**
   * Returns the current edge style as a string.
   */
  createCurrentEdgeStyle() {
    const { defaultEdgeStyle, currentEdgeStyle } = this;
    var style = "edgeStyle=" + (currentEdgeStyle["edgeStyle"] || "none") + ";";

    if (currentEdgeStyle["shape"] != null) {
      style += "shape=" + currentEdgeStyle["shape"] + ";";
    }

    if (currentEdgeStyle["curved"] != null) {
      style += "curved=" + currentEdgeStyle["curved"] + ";";
    }

    if (currentEdgeStyle["rounded"] != null) {
      style += "rounded=" + currentEdgeStyle["rounded"] + ";";
    }

    if (currentEdgeStyle["comic"] != null) {
      style += "comic=" + currentEdgeStyle["comic"] + ";";
    }

    if (currentEdgeStyle["jumpStyle"] != null) {
      style += "jumpStyle=" + currentEdgeStyle["jumpStyle"] + ";";
    }

    if (currentEdgeStyle["jumpSize"] != null) {
      style += "jumpSize=" + currentEdgeStyle["jumpSize"] + ";";
    }

    // Overrides the global default to match the default edge style
    if (currentEdgeStyle["orthogonalLoop"] != null) {
      style += "orthogonalLoop=" + currentEdgeStyle["orthogonalLoop"] + ";";
    } else if (defaultEdgeStyle["orthogonalLoop"] != null) {
      style += "orthogonalLoop=" + defaultEdgeStyle["orthogonalLoop"] + ";";
    }

    // Overrides the global default to match the default edge style
    if (currentEdgeStyle["jettySize"] != null) {
      style += "jettySize=" + currentEdgeStyle["jettySize"] + ";";
    } else if (defaultEdgeStyle["jettySize"] != null) {
      style += "jettySize=" + defaultEdgeStyle["jettySize"] + ";";
    }

    // Special logic for custom property of elbowEdgeStyle
    if (
      currentEdgeStyle["edgeStyle"] == "elbowEdgeStyle" &&
      currentEdgeStyle["elbow"] != null
    ) {
      style += "elbow=" + currentEdgeStyle["elbow"] + ";";
    }

    if (currentEdgeStyle["html"] != null) {
      style += "html=" + currentEdgeStyle["html"] + ";";
    } else {
      style += "html=1;";
    }

    return style;
  }
}
