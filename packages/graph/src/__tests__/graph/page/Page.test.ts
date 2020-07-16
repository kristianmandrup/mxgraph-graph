import { Graph, Page } from "../../../graph";

describe("Page", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new Page(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("defaultPageBackgroundColor", () => {
        it("is white", () => {
          expect(instance.defaultPageBackgroundColor).toEqual("#ffffff");
        });
      });

      describe("defaultPageBorderColor", () => {
        it("is white", () => {
          expect(instance.defaultPageBorderColor).toEqual("#ffffff");
        });
      });

      describe("defaultPageVisible", () => {
        it("is true", () => {
          expect(instance.defaultPageVisible).toBeTruthy();
        });
      });
    });

    describe("methods", () => {
      describe("getGraphBounds()", () => {
        it("bounds", () => {
          expect(instance.getGraphBounds()).toBeDefined();
        });
      });

      describe("getPagePadding()", () => {
        it("padding", () => {
          expect(instance.getPagePadding()).toBeDefined();
        });
      });

      describe("getPageSize()", () => {
        it("page size", () => {
          expect(instance.getPageSize()).toBeDefined();
        });
      });

      describe("getPageLayout()", () => {
        it("page layout", () => {
          expect(instance.getPageLayout()).toBeDefined();
        });
      });
    });
  });
});
