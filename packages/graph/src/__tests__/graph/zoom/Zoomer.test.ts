import { Graph } from "../../../graph";
import { Zoomer } from "../../../graph";

describe("Zoomer", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new Zoomer(graph);
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
      describe("zoom(factor)", () => {
        it("is label", () => {
          const factor = 2;
          expect(instance.zoom(factor)).toBeDefined();
        });
      });

      describe("zoom(factor, center)", () => {
        it("zooms to center", () => {
          const factor = 2;
          const center = true;
          expect(instance.zoom(factor, center)).toBeDefined();
        });
      });
    });
  });
});
