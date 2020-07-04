import { Graph } from "../../../graph";
import { GraphCssTransformConfig } from "../../../graph";

describe("GraphLayoutManager", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new GraphCssTransformConfig(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("model", () => {
        it("is set", () => {
          expect(instance.model).toBe(graph.model);
        });
      });

      describe("useCssTransforms", () => {
        it("is false", () => {
          expect(instance.useCssTransforms).toBeFalsy();
        });
      });

      describe("currentScale", () => {
        it("is 1", () => {
          expect(instance.currentScale).toEqual(1);
        });
      });

      describe("currentTranslate", () => {
        it("is a point", () => {
          expect(instance.currentTranslate).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("getModel()", () => {
        it("gets model", () => {
          expect(instance.getModel()).toBeDefined();
        });
      });

      describe("isFastZoomEnabled()", () => {
        it("is false", () => {
          expect(instance.isFastZoomEnabled()).toBeFalsy();
        });
      });

      describe("isCssTransformsSupported()", () => {
        it("is false", () => {
          expect(instance.isCssTransformsSupported()).toBeFalsy();
        });
      });

      describe("getCellAt(x, y, parent, vertices, edges, ignoreFn)", () => {
        const x = 0,
          y = 0,
          parent = {},
          vertices = [{}],
          edges = [{}];
        const ignoreFn = () => {};

        it("gets cell", () => {
          expect(
            instance.getCellAt(x, y, parent, vertices, edges, ignoreFn)
          ).toBeDefined();
        });
      });
      describe("getScaledCellAt(x, y, parent, vertices, edges, ignoreFn)", () => {
        const x = 0,
          y = 0,
          parent = {},
          vertices = [{}],
          edges = [{}];
        const ignoreFn = () => {};

        it("gets cell", () => {
          expect(
            instance.getScaledCellAt(x, y, parent, vertices, edges, ignoreFn)
          ).toBeDefined();
        });
      });

      describe("isRecursiveVertexResize(state)", () => {
        it("is false", () => {
          const state = {};
          expect(instance.isRecursiveVertexResize(state)).toBeFalsy();
        });
      });

      describe("isPart(cell)", () => {
        it("is false", () => {
          const cell = {}; // fake cell
          expect(instance.isPart(cell)).toBeFalsy();
        });
      });

      describe("getCompositeParent(cell)", () => {
        it("gets parent", () => {
          const cell = {}; // fake cell
          expect(instance.getCompositeParent(cell)).toBeDefined();
        });
      });

      describe("updateCssTransform()", () => {
        it("updates - no throw", () => {
          expect(() => instance.updateCssTransform()).not.toThrow();
        });
      });

      describe("setValidateBackgroundPage()", () => {
        it("sets - no throw", () => {
          expect(() => instance.setValidateBackgroundPage()).not.toThrow();
        });
      });
    });
  });
});
