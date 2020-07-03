import { StencilRegistry } from "../../../mx-config/stencil-registry";

describe("StencilRegistry", () => {
  let instance;

  beforeEach(() => {
    instance = new StencilRegistry();
  });

  describe("instance", () => {
    describe("methods", () => {
      describe("setGlobals()", () => {
        let mxStencilRegistry;

        beforeEach(() => {
          mxStencilRegistry = instance.setGlobals();
        });

        describe("mxStencilRegistry", () => {
          it("sets currentLink", () => {
            expect(mxStencilRegistry.dynamicLoading).toBeTruthy();
          });
        });
      });

      describe("setGetStencil()", () => {
        let mxStencilRegistry;

        beforeEach(() => {
          mxStencilRegistry = instance.setGetStencil();
        });

        describe("mxStencilRegistry", () => {
          it("sets currentLink", () => {
            expect(mxStencilRegistry.dynamicLoading).toBeTruthy();
          });
        });
      });
    });
  });
});
