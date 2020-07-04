import { Importer } from "../..";
import { Graph } from "../../graph";

describe("GraphLayoutManager", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  const node = {};
  const dx = 0,
    dy = 0;
  const crop = true;

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new Importer(graph, node, dx, dy, crop);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("node", () => {
        it("is set", () => {
          expect(instance.node).toBe(node);
        });
      });

      describe("dx", () => {
        it("is set", () => {
          expect(instance.dx).toEqual(dx);
        });
      });

      describe("dy", () => {
        it("is set", () => {
          expect(instance.dy).toEqual(dy);
        });
      });

      describe("crop", () => {
        it("is set", () => {
          expect(instance.crop).toBe(crop);
        });
      });

      describe("tempModel", () => {
        it("is set", () => {
          expect(instance.tempModel).toBeDefined();
        });
      });

      describe("lookup", () => {
        it("is set", () => {
          expect(instance.lookup).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("createGraphModel()", () => {
        it("graph model", () => {
          expect(instance.createGraphModel()).toBeDefined();
        });
      });

      describe("createCodec(node)", () => {
        it("codec", () => {
          expect(instance.createCodec(node)).toBeDefined();
        });
      });

      describe("importGraphModel()", () => {
        it("imports graph model", () => {
          expect(() => instance.importGraphModel()).not.toThrow();
        });
      });

      describe("importLayers(layers)", () => {
        it("imports layers", () => {
          const layers = [{}];
          expect(() => instance.importLayers(layers)).not.toThrow();
        });
      });

      describe("mapClonedEntries()", () => {
        it("maps", () => {
          expect(() => instance.mapClonedEntries()).not.toThrow();
        });
      });

      describe("mergeLayers()", () => {
        it("merges layers", () => {
          expect(() => instance.mergeLayers()).not.toThrow();
        });
      });
    });
  });
});
