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
      describe("getLabel(cell)", () => {
        it("is label", () => {
          const cell = {};
          expect(instance.getLabel(cell)).toBeDefined();
        });
      });

      describe("replacePlaceholders(cell, str)", () => {
        it("is relative", () => {
          const cell = {};
          const str = "x";
          expect(instance.replacePlaceholders(cell, str)).toBeDefined();
        });
      });

      describe("updatePlaceholders()", () => {
        it("update", () => {
          expect(() => instance.updatePlaceholders()).not.toThrow();
        });
      });

      describe("isReplacePlaceholders(cell)", () => {
        it("is false", () => {
          const cell = {};
          expect(instance.isReplacePlaceholders(cell)).toBeFalsy();
        });
      });
    });
  });
});
