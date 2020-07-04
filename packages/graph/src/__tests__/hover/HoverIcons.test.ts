import { Graph } from "../../graph";
import { HoverIcons } from "../../hover";

describe("GraphLayoutManager", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    const $graph = new Graph(container, model, opts);
    graph = $graph.graph;
    instance = new HoverIcons(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("arrowUp", () => {
        it("is set", () => {
          expect(instance.arrowUp).toBeDefined();
        });
      });

      describe("arrowRight", () => {
        it("is set", () => {
          expect(instance.arrowRight).toBeDefined();
        });
      });

      describe("arrowDown", () => {
        it("is set", () => {
          expect(instance.arrowDown).toBeDefined();
        });
      });

      describe("arrowLeft", () => {
        it("is set", () => {
          expect(instance.arrowLeft).toBeDefined();
        });
      });

      describe("arrowSpacing", () => {
        it("is 2", () => {
          expect(instance.arrowSpacing).toEqual(2);
        });
      });

      describe("updateDelay", () => {
        it("is 500", () => {
          expect(instance.updateDelay).toEqual(500);
        });
      });

      describe("activationDelay", () => {
        it("is 140", () => {
          expect(instance.activationDelay).toEqual(140);
        });
      });

      describe("currentState", () => {
        it("is undefined", () => {
          expect(instance.currentState).toBeUndefined();
        });
      });

      describe("activeArrow", () => {
        it("is undefined", () => {
          expect(instance.activeArrow).toBeUndefined();
        });
      });

      describe("inactiveOpacity", () => {
        it("is 15", () => {
          expect(instance.inactiveOpacity).toEqual(15);
        });
      });

      describe("cssCursor", () => {
        it("is copy", () => {
          expect(instance.cssCursor).toEqual("copy");
        });
      });

      describe("checkCollisions", () => {
        it("is true", () => {
          expect(instance.checkCollisions).toBeTruthy();
        });
      });

      describe("arrowFill", () => {
        it("is color #29b6f2", () => {
          expect(instance.arrowFill).toEqual("#29b6f2");
        });
      });

      describe("triangleUp", () => {
        it("is defined", () => {
          expect(instance.triangleUp).toBeDefined();
        });
      });

      describe("triangleRight", () => {
        it("is defined", () => {
          expect(instance.triangleRight).toBeDefined();
        });
      });

      describe("triangleDown", () => {
        it("is defined", () => {
          expect(instance.triangleDown).toBeDefined();
        });
      });
      describe("triangleLeft", () => {
        it("is defined", () => {
          expect(instance.triangleLeft).toBeDefined();
        });
      });

      describe("roundDrop", () => {
        it("is defined", () => {
          expect(instance.roundDrop).toBeDefined();
        });
      });

      describe("refreshTarget", () => {
        it("is defined", () => {
          expect(instance.refreshTarget).toBeDefined();
        });
      });

      describe("tolerance", () => {
        it("no touch - 0", () => {
          expect(instance.tolerance).toEqual(0);
        });
      });
    });

    describe("methods", () => {
      describe("init()", () => {
        it("does not throw", () => {
          expect(() => instance.init()).not.toThrow();
        });

        // ...
      });

      describe("isResetEvent(evt, allowShift)", () => {
        it("is false", () => {
          const evt = {}; // fake event
          expect(instance.isResetEvent(evt)).toBeFalsy();
        });
      });

      describe("createArrow(img, tooltip)", () => {
        it("returns arrow", () => {
          const img = (new Image().src = "x");
          const tooltip = "x";
          expect(instance.createArrow(img, tooltip)).toBeDefined();
        });
      });

      describe("resetActiveArrow()", () => {
        it("does not throw", () => {
          expect(() => instance.resetActiveArrow()).not.toThrow();
        });
      });

      describe("getDirection()", () => {
        it("direction", () => {
          expect(instance.getDirection()).toBeDefined();
        });
      });

      describe("visitNodes(visitor)", () => {
        it("does not throw", () => {
          const visitor = {
            visit: (node) => {
              node.visited = true;
            },
          };
          expect(() => instance.visitNodes(visitor)).not.toThrow();
        });
      });

      describe("removeNodes()", () => {
        it("does not throw", () => {
          expect(() => instance.removeNodes()).not.toThrow();
        });
      });

      describe("setDisplay(display)", () => {
        it("does not throw", () => {
          const display = "x";
          expect(() => instance.setDisplay(display)).not.toThrow();
        });
      });

      describe("isActive()", () => {
        it("is false", () => {
          expect(instance.isActive()).toBeFalsy();
        });
      });

      describe("drag(evt, x, y)", () => {
        it("is false", () => {
          const evt = {}; // fake event
          const x = 0,
            y = 0;
          expect(() => instance.drag(evt, x, y)).not.toThrow();
        });
      });

      describe("getStateAt(state, x, y)", () => {
        it("state", () => {
          const state = {}; // fake state
          const x = 0,
            y = 0;
          expect(instance.getStateAt(state, x, y)).toBeDefined();
        });
      });

      describe("click(state, dir, me)", () => {
        it("no throw", () => {
          const state = {}; // fake state
          const dir = "left",
            me = {};
          expect(() => instance.click(state, dir, me)).not.toThrow();
        });
      });

      describe("reset(clearTimeout)", () => {
        it("no throw", () => {
          const clearTimeout = () => {};
          expect(() => instance.reset(clearTimeout)).not.toThrow();
        });
      });

      describe("repaint()", () => {
        it("no throw", () => {
          expect(() => instance.repaint()).not.toThrow();
        });
      });

      describe("computeBoundingBox()", () => {
        it("no throw", () => {
          expect(() => instance.computeBoundingBox()).not.toThrow();
        });
      });

      describe("getState(state)", () => {
        it("state", () => {
          const state = {}; // fake state
          expect(instance.getState(state)).toBeDefined();
        });
      });

      describe("update(state, x?, y?)", () => {
        it("no throw", () => {
          const state = {}; // fake state
          const x = 0,
            y = 0;
          expect(() => instance.update(state, x, y)).not.toThrow();
        });
      });

      describe("update(state, x?, y?)", () => {
        it("no throw", () => {
          const state = {}; // fake state
          expect(() => instance.setCurrentState(state)).not.toThrow();
        });
      });
    });
  });
});
