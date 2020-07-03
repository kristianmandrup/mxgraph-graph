import { Click } from "../../click";
import { Graph } from "../../";
import { testInheritBaseEvent } from "./BaseEvent-inherited";

describe("Click", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new Click(graph);
  });

  describe("instance", () => {
    describe("inherited", () => {
      testInheritBaseEvent(instance);
    });

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

      describe("view", () => {
        it("is set", () => {
          expect(instance.view).toBe(graph.view);
        });
      });

      describe("mouseListener", () => {
        it("is set", () => {
          expect(instance.mouseListener).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("instance(me)", () => {
        const me = {};

        beforeEach(() => {
          instance.instance(me);
        });

        it("sets firstClickState", () => {
          expect(instance.firstClickState).toBeDefined();
        });

        it("sets firstClickSource", () => {
          expect(instance.firstClickSource).toBeDefined();
        });
      });

      describe("dblClick(evt, cell)", () => {
        const evt = {};
        const cell = {};

        it("does not throw", () => {
          expect(() => instance.dblClick(evt, cell)).not.toThrow();
        });
      });

      describe("addClickHandler()", () => {
        it("does not throw", () => {
          expect(() => instance.addClickHandler()).not.toThrow();
        });
      });
    });
  });
});
