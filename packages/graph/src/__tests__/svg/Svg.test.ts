import { Svg } from "../..";
import { Graph } from "../../graph";

describe("Svg", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new Svg(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("view", () => {
        it("is set", () => {
          expect(instance.view).toBeDefined();
        });
      });

      describe("model", () => {
        it("is set", () => {
          expect(instance.model).toBeDefined();
        });
      });

      describe("state", () => {
        it("is set", () => {
          expect(instance.state).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("createSvgCanvas(node)", () => {
        it("creates", () => {
          const node = {}; // fake node
          expect(instance.createSvgCanvas(node)).toBeDefined();
        });
      });

      describe("createSvgImageExport()", () => {
        it("creates", () => {
          expect(instance.createSvgImageExport()).toBeDefined();
        });
      });

      describe("getSvg(opts)", () => {
        const opts = {
          // background,
          // scale,
          // border,
          // nocrop,
          // crisp,
          // ignoreSelection,
          // showText,
          // imgExport,
          // linkTarget,
          // hasShadow,
        };
        it("creates", () => {
          expect(() => instance.getSvg(opts)).not.toThrow();
        });

        it("gets svg", () => {
          expect(instance.getSvg(opts)).toBeDefined();
        });
      });
    });
  });
});
