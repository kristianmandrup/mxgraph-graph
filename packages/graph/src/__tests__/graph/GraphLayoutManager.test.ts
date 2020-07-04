import { Graph } from "../../graph";
import { GraphLayoutManager } from "../../graph/GraphLayoutManager";

describe("GraphLayoutManager", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new GraphLayoutManager(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("layoutManager", () => {
        it("is set", () => {
          expect(instance.layoutManager).toBe(graph.layoutManager);
        });
      });
    });

    describe("methods", () => {
      describe("initLayoutManager()", () => {
        it("does not throw", () => {
          expect(() => instance.initLayoutManager()).not.toThrow();
        });
      });
    });
  });
});
