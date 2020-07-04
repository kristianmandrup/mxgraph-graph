import { Styling } from "../..";
import { Graph } from "../../graph";

describe("Styling", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new Styling(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("currentEdgeStyle", () => {
        it("is set", () => {
          expect(instance.currentEdgeStyle).toBeDefined();
        });
      });

      describe("defaultEdgeStyle", () => {
        const style = {
          edgeStyle: "orthogonalEdgeStyle",
          rounded: "0",
          jettySize: "auto",
          orthogonalLoop: "1",
        };
        it("is set", () => {
          expect(instance.defaultEdgeStyle).toEqual(style);
        });
      });
    });

    describe("methods", () => {
      describe("createCurrentEdgeStyle()", () => {
        it("creates - no throw", () => {
          expect(() => instance.createCurrentEdgeStyle()).not.toThrow();
        });
      });
    });
  });
});
