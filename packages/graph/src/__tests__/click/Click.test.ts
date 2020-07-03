import { Click } from "../../click";
import { Graph } from "../../";

describe("Click", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let click, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    click = new Click(graph);
  });

  describe("instance", () => {
    describe("inherited", () => {
      describe("properties", () => {
        describe("hasHighlight", () => {
          it("is set", () => {
            expect(click.hasHighlight).toBeDefined();
          });
        });
      });

      // BaseEventer
      describe("methods", () => {
        describe("getHighlight", () => {
          it("is set", () => {
            expect(click.getHighlight()).toBeDefined();
          });
        });

        describe("createHighlight()", () => {
          it("is set", () => {
            expect(click.createHighlight()).toBeDefined();
          });
        });
      });
    });

    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(click.graph).toBe(graph);
        });
      });

      describe("model", () => {
        it("is set", () => {
          expect(click.model).toBe(graph.model);
        });
      });

      describe("view", () => {
        it("is set", () => {
          expect(click.view).toBe(graph.view);
        });
      });

      describe("mouseListener", () => {
        it("is set", () => {
          expect(click.mouseListener).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("click(me)", () => {
        const me = {};

        beforeEach(() => {
          click.click(me);
        });

        it("sets firstClickState", () => {
          expect(click.firstClickState).toBeDefined();
        });

        it("sets firstClickSource", () => {
          expect(click.firstClickSource).toBeDefined();
        });
      });

      describe("methods", () => {
        describe("dblClick(evt, cell)", () => {
          const evt = {};
          const cell = {};

          it("does not throw", () => {
            expect(() => click.dblClick(evt, cell)).not.toThrow();
          });
        });

        describe("addClickHandler()", () => {
          it("does not throw", () => {
            expect(() => click.addClickHandler()).not.toThrow();
          });
        });
      });
    });
  });
});
