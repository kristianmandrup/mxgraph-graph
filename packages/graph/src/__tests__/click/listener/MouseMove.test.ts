import { MouseMove } from "../../../click";
import { Graph } from "../../..";
import { testInheritBaseEvent } from "../BaseEvent-inherited";

describe("MouseMove", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new MouseMove(graph);
  });

  describe("instance", () => {
    describe("inherited", () => {
      testInheritBaseEvent(instance);
    });

    describe("methods", () => {
      describe("handler(sender, me)", () => {
        const me = {};
        const sender = {};

        it("does not throw", () => {
          expect(() => instance.handler(sender, me)).toBeDefined();
        });
      });
    });
  });
});
