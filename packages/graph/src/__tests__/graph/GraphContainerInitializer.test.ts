import { GraphContainerInitializer, Graph } from "../../graph";

describe("GraphContainerInitializer", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new GraphContainerInitializer(graph);
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
      describe("init(container)", () => {
        it("initializes", () => {
          expect(() => instance.init(container)).not.toThrow();
        });
      });

      describe("initLayoutManager()", () => {
        it("initializes layout manager", () => {
          expect(() => instance.initLayoutManager()).not.toThrow();
        });
      });
    });
  });
});
