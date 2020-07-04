import { StylesheetLoader } from "../..";
import { Graph } from "../../graph";

describe("StylesheetLoader", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new StylesheetLoader(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("defaultThemeName", () => {
        it("is set", () => {
          expect(instance.defaultThemeName).toBeDefined();
        });
      });

      describe("themes", () => {
        it("is set", () => {
          expect(instance.themes).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("getStylesheet()", () => {
        it("get stylesheet", () => {
          expect(instance.getStylesheet()).toBeDefined();
        });
      });

      describe("loadStylesheet()", () => {
        it("loads - no throw", () => {
          expect(() => instance.loadStylesheet()).not.toThrow();
        });
      });
    });
  });
});
