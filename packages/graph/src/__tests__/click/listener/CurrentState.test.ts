import { CurrentState } from "../../../click";
import { Graph } from "../../..";
import { testInheritBaseEvent } from "../BaseEvent-inherited";

describe("CurrentState", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new CurrentState(graph);
  });

  describe("instance", () => {
    describe("inherited", () => {
      testInheritBaseEvent(instance);
    });

    describe("methods", () => {
      describe("update(me)", () => {
        const state = {};

        beforeEach(() => {
          instance.update(state);
        });

        it("sets currentLink", () => {
          expect(instance.currentState).toBeDefined();
        });
      });
    });
  });
});
