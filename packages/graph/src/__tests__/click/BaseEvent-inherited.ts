export const testInheritBaseEvent = (instance) => {
  describe("inherited", () => {
    describe("properties", () => {
      describe("hasHighlight", () => {
        it("is set", () => {
          expect(instance.hasHighlight).toBeDefined();
        });
      });
    });

    // BaseEventer
    describe("methods", () => {
      describe("getHighlight", () => {
        it("is set", () => {
          expect(instance.getHighlight()).toBeDefined();
        });
      });

      describe("createHighlight()", () => {
        it("is set", () => {
          expect(instance.createHighlight()).toBeDefined();
        });
      });
    });
  });
};
