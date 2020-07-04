import { TableLayout } from "../..";
import { Graph } from "../../graph";

describe("TableLayout", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new TableLayout(graph);
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

      describe("resizeCell(cell, geo, prev)", () => {
        it("resizes - no throw", () => {
          const cell = {}; // fake cell
          const geo = {},
            prev = {};
          expect(() => instance.resizeCell(cell, geo, prev)).not.toThrow();
        });
      });

      describe("execute(table)", () => {
        it("executes - no throw", () => {
          const table = {};
          expect(() => instance.execute(table)).not.toThrow();
        });
      });
    });
  });
});
