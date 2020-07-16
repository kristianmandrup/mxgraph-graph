import { Graph } from "../../../graph";
import { UrlChecker } from "../../../graph";

describe("UrlChecker", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new UrlChecker(graph);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("baseUrl", () => {
        it("is set", () => {
          expect(instance.baseUrl).toBeDefined();
        });
      });

      describe("domainUrl", () => {
        it("is set", () => {
          expect(instance.domainUrl).toBeDefined();
        });
      });

      describe("domainPathUrl", () => {
        it("is set", () => {
          expect(instance.domainPathUrl).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("isExternalProtocol(href)", () => {
        it("is false", () => {
          const href = "w";
          expect(instance.isExternalProtocol(href)).toBeFalsy();
        });
      });

      describe("isRelativeUrl(url)", () => {
        it("is relative", () => {
          const url = "/x";
          expect(instance.isRelativeUrl(url)).toBeTruthy();
        });

        it("is not relative", () => {
          const url = "http://www.x.com";
          expect(instance.isRelativeUrl(url)).toBeFalsy();
        });
      });

      describe("getAbsoluteUrl(url)", () => {
        const url = "/x";
        it("absolute", () => {
          expect(instance.getAbsoluteUrl(url)).toBeDefined();
        });
      });
    });
  });
});
