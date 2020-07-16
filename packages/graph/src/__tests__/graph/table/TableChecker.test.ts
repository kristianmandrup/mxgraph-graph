import { Graph } from "../../../graph";
import { PlaceholderManager } from "../../../graph";

describe("PlaceholderManager", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new PlaceholderManager(graph);
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
      describe("getCellStyle(cell)", () => {
        it("cell style", () => {
          const cell = {};
          expect(instance.getCellStyle(cell)).toBeDefined();
        });
      });

      describe("isTableCell(cell)", () => {
        it("is false", () => {
          const cell = {};
          expect(instance.isTableCell(cell)).toBeFalsy();
        });
      });

      describe("isTableRow(cell)", () => {
        it("is false", () => {
          const cell = {};
          expect(instance.isTableRow(cell)).toBeFalsy();
        });
      });

      describe("isTable(cell)", () => {
        it("is false", () => {
          const cell = {};
          expect(instance.isTable(cell)).toBeFalsy();
        });
      });
    });
  });
});
