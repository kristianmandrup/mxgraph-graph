import { Graph } from "../../graph";
import { ValueConverter } from "../../graph";

describe("ValueConverter", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new ValueConverter(graph);
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
      describe("isReplacePlaceholders(cell)", () => {
        it("is false", () => {
          const cell = {};
          expect(instance.isReplacePlaceholders(cell)).toBeFalsy();
        });
      });

      describe("convertValueToString(cell)", () => {
        it("is string value", () => {
          const cell = {};
          expect(instance.convertValueToString(cell)).toBeDefined();
        });
      });
    });
  });
});
