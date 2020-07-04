import { Placeholders } from "../..";
import { Graph } from "../../graph";

describe("InsertPoint", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new Placeholders(graph);
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
      describe("stencilHasPlaceholders(stencil)", () => {
        it("has placeholders", () => {
          const stencil = {};
          expect(instance.stencilHasPlaceholders(stencil)).toBeFalsy();
        });
      });

      describe("processChange(change)", () => {
        it("process", () => {
          const change = () => {};
          expect(() => instance.processChange(change)).not.toThrow();
        });
      });
    });
  });
});
