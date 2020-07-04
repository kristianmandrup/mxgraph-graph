import { Link } from "../..";
import { Graph } from "../../graph";

describe("InsertPoint", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new Link(graph);
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
      describe("insertLink(value)", () => {
        it("insert point", () => {
          const value = {};
          expect(instance.insertLink(value)).toBeDefined();
        });
      });
    });
  });
});
