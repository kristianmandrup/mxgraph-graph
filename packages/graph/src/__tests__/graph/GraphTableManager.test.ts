import { Graph } from "../../graph";
import { GraphTableManager } from "../../graph";

describe("GraphTableManager", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new GraphTableManager(graph);
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
      describe("createTable(rowCount, colCount, w, h)", () => {
        const rowCount = 0,
          colCount = 0,
          w = 100,
          h = 100;

        it("does not throw", () => {
          expect(() =>
            instance.createTable(rowCount, colCount, w, h)
          ).not.toThrow();
        });
      });

      describe("tableResized(table)", () => {
        const table = {};
        it("does not throw", () => {
          expect(() => instance.tableResized(table)).not.toThrow();
        });
      });

      describe("tableResized(table)", () => {
        const table = {};
        it("does not throw", () => {
          expect(() => instance.tableResized(table)).not.toThrow();
        });
      });

      describe("setRowHeight(row, height)", () => {
        const row = 0,
          height = 0;
        it("does not throw", () => {
          expect(() => instance.setRowHeight(row, height)).not.toThrow();
        });
      });

      describe("tableCellResized(cell, bounds, prev)", () => {
        const cell = {},
          bounds = {},
          prev = {};
        it("does not throw", () => {
          expect(() =>
            instance.tableCellResized(cell, bounds, prev)
          ).not.toThrow();
        });
      });
    });
  });
});
