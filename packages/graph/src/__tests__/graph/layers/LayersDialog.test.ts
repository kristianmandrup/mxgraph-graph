import { Graph, LayersDialog } from "../../../graph";

describe("LayersDialog", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new LayersDialog(graph);
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
      describe("create()", () => {
        it("creates layer dialog element", () => {
          expect(instance.create()).toBeDefined();
        });
      });
    });
  });
});
