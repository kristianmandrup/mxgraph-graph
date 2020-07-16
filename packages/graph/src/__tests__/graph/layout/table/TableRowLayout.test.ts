import { TableRowLayout } from "../..";
import { Graph } from "../../graph";

describe("TableRowLayout", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new TableRowLayout(graph);
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
      describe("moveCell(cell, x, y)", () => {
        it("moves - no throw", () => {
          const cell = {}; // fake cell
          const x = 0,
            y = 0;
          expect(() => instance.moveCell(cell, x, y)).not.toThrow();
        });
      });

      describe("execute(row)", () => {
        it("executes - no throw", () => {
          const row = {};
          expect(() => instance.execute(row)).not.toThrow();
        });
      });
    });
  });
});
