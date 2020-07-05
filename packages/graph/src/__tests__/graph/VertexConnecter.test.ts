import { Graph } from "../../graph";
import { PlaceholderManager } from "../../graph";

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
      describe("isCellConnectable(cell)", () => {
        it("is false", () => {
          const cell = {};
          expect(instance.isCellConnectable(cell)).toBeFalsy();
        });
      });

      describe("selectCellsForConnectVertex(cells, evt, hoverIcons)", () => {
        it("is false", () => {
          const cells = [{}];
          const evt = {};
          const hoverIcons = [];
          expect(
            instance.selectCellsForConnectVertex(cells, evt, hoverIcons)
          ).toBeFalsy();
        });
      });

      describe("connectVertex(source, direction, length, evt, forceClone, ignoreCellAt)", () => {
        const source = {},
          direction = "left",
          length = 1,
          evt = {},
          forceClone = false,
          ignoreCellAt = false;
        it("is false", () => {
          expect(
            instance.connectVertex(
              source,
              direction,
              length,
              evt,
              forceClone,
              ignoreCellAt
            )
          ).toBeFalsy();
        });
      });
    });
  });
});
