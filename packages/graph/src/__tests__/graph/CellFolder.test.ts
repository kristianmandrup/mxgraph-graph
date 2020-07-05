import { Graph } from "../../graph";
import { CellFolder } from "../../graph";

describe("CellFolder", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new CellFolder(graph);
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
      describe("foldCells(collapse, recurse, cells, checkFoldable, evt)", () => {
        const collapse = true;
        const recurse = false;
        const cells = [{}];
        const checkFoldable = false;
        const evt = {};
        it("folds", () => {
          expect(
            instance.foldCells(collapse, recurse, cells, checkFoldable, evt)
          ).toBeDefined();
        });
      });

      describe("moveSiblings(state, parent, dx, dy)", () => {
        const state = {},
          parent = {},
          dx = 0,
          dy = 0;

        it("moves siblings", () => {
          expect(instance.moveSiblings(state, parent, dx, dy)).toBeDefined();
        });
      });

      describe("resizeParentStacks(parent, layout, dx, dy)", () => {
        const layout = {},
          parent = {},
          dx = 0,
          dy = 0;

        it("resizes", () => {
          expect(() =>
            instance.resizeParentStacks(parent, layout, dx, dy)
          ).not.toThrow();
        });
      });

      describe("isMoveCellsEvent(evt, state)", () => {
        describe("not a move cells event", () => {
          const evt = {};
          const state = {};
          it("is false", () => {
            expect(instance.isMoveCellsEvent(evt, state)).toBeFalsy();
          });
        });
        describe("a move cells event", () => {
          const evt = {
            move: true,
          };
          const state = {};

          it("is true", () => {
            expect(instance.isMoveCellsEvent(evt, state)).toBeTruthy();
          });
        });
      });

      describe("getLinkTitle(href)", () => {
        const href = "www.x.com";

        it("is the title", () => {
          expect(instance.getLinkTitle(href)).toEqual("x");
        });
      });

      describe("isCustomLink(href)", () => {
        const href = "www.x.com";

        it("is custom", () => {
          expect(instance.isCustomLink(href)).toEqual("x");
        });
      });

      describe("customLinkClicked(link)", () => {
        const link = "www.x.com";

        it("is clicked", () => {
          expect(instance.customLinkClicked(link)).toBeDefined();
        });
      });
    });
  });
});
