import { MouseListener } from "../../../click";
import { Graph } from "../../..";
import { testInheritBaseEvent } from "../BaseEvent-inherited";

describe("MouseListener", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new MouseListener(graph);
  });

  describe("instance", () => {
    describe("inherited", () => {
      testInheritBaseEvent(instance);
    });

    describe("methods", () => {
      describe("createHandler()", () => {
        let result: any;

        beforeEach(() => {
          result = instance.createHandler();
        });

        it("has mouseDown", () => {
          expect(result.mouseDown).toBeDefined();
        });
      });
    });
  });
});
