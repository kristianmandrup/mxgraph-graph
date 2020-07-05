import { Graph } from "../../graph";
import { CustomLinks } from "../../graph";

describe("CustomLinks", () => {
  let instance;
  beforeEach(() => {
    instance = new CustomLinks();
  });

  describe("instance", () => {
    describe("methods", () => {
      describe("updateCustomLinks(mapping, cells)", () => {
        const cells = [{}];
        const mapping = {};
        it("updates - no throw", () => {
          expect(() =>
            instance.updateCustomLinks(mapping, cells)
          ).not.toThrow();
        });
      });

      describe("updateCustomLinksForCell(mapping, cell)", () => {
        const cell = {};
        const mapping = {};

        it("updates custom links for cell - no throw", () => {
          expect(() =>
            instance.updateCustomLinksForCell(mapping, cell)
          ).not.toThrow();
        });
      });
    });
  });
});
