import { Clear } from "../../../click";
import { Graph } from "../../..";
import { testInheritBaseEvent } from "../BaseEvent-inherited";

describe("Clear", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new Clear(graph);
  });

  describe("instance", () => {
    describe("inherited", () => {
      testInheritBaseEvent(instance);
    });

    describe("methods", () => {
      describe("click(me)", () => {
        const state = {};

        beforeEach(() => {
          instance.handler(state);
        });

        it("sets currentLink", () => {
          expect(instance.currentLink).toBeDefined();
        });
      });
    });
  });
});
