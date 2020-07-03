import { BaseListener } from "../../../click";
import { Graph } from "../../..";
import { testInheritBaseEvent } from "../BaseEvent-inherited";

describe("Click", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new BaseListener(graph);
  });

  describe("instance", () => {
    testInheritBaseEvent(instance);

    describe("properties", () => {
      describe("clear", () => {
        it("is set", () => {
          expect(instance.clear).toBeDefined();
        });
      });

      describe("activate", () => {
        it("is set", () => {
          expect(instance.activate).toBeDefined();
        });
      });
    });
  });
});
