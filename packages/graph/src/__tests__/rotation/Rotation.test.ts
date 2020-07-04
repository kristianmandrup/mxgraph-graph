import { Rotation } from "../..";
import { Graph } from "../../graph";

describe("InsertPoint", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new Rotation(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });
    });

    describe("methods", () => {
      describe("turnShapes(cells, backwards)", () => {
        it("turns - no throw", () => {
          const backwards = false;
          const cells = [{}]; // fake cells
          expect(() => instance.turnShapes(cells, backwards)).not.toThrow();
        });
      });
    });
  });
});
