import { Graph } from "../../graph";
import { LinkManager } from "../../graph";

describe("LinkManager", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    graph = new Graph(container, model, opts);
    instance = new LinkManager(graph);
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

      describe("labelLinkClicked(state, elem, evt)", () => {
        const state = {};
        const elem = document.createElement("a");
        elem.setAttribute("href", "www.x.com");
        const evt = {};

        it("is false", () => {
          expect(() =>
            instance.labelLinkClicked(state, elem, evt)
          ).not.toThrow();
        });
      });

      // - LinkInfo class
      describe("openLink(href, target, allowOpener?)", () => {
        const href = "www.x.com";
        const target = document.createElement("a");

        it("does not throw", () => {
          expect(() => instance.openLink(href, target)).not.toThrow();
        });
      });

      describe("getLinkTitle(href)", () => {
        const href = "www.x.com";

        it("is the title", () => {
          expect(instance.getLinkTitle(href)).toEqual("x");
        });
      });

      describe("isCustomLink(href)", () => {
        const href = "www.x.com";

        it("is custom", () => {
          expect(instance.isCustomLink(href)).toEqual("x");
        });
      });

      describe("customLinkClicked(link)", () => {
        const link = "www.x.com";

        it("is clicked", () => {
          expect(instance.customLinkClicked(link)).toBeDefined();
        });
      });
    });
  });
});
