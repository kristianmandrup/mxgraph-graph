import { InsertPoint } from "../..";
import { Graph } from "../../graph";

describe("InsertPoint", () => {
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
    instance = new InsertPoint(graph);
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
      describe("getInsertPoint()", () => {
        it("insert point", () => {
          expect(instance.getInsertPoint()).toBeDefined();
        });
      });

      describe("getFreeInsertPoint()", () => {
        it("insert point", () => {
          expect(instance.getFreeInsertPoint()).toBeDefined();
        });
      });

      describe("getCenterInsertPoint(bbox)", () => {
        it("insert point", () => {
          const bbox = {};
          expect(instance.getCenterInsertPoint(bbox)).toBeDefined();
        });
      });

      describe("isMouseInsertPoint()", () => {
        it("is false", () => {
          expect(instance.isMouseInsertPoint()).toBeFalsy();
        });
      });
    });
  });
});
