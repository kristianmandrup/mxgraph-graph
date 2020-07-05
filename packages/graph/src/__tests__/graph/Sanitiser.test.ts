import { Sanitizer } from "../../graph";

describe("Sanitizer", () => {
  describe("methods", () => {
    describe("sanitizeHtml", () => {
      describe("sanitizeHtml(value)", () => {
        const value = "x";
        it("sanitized", () => {
          expect(Sanitizer.sanitizeHtml(value)).toBeDefined();
        });
      });

      describe("sanitizeHtml(value, editing)", () => {
        const value = "x",
          editing = true;
        it("sanitized", () => {
          expect(Sanitizer.sanitizeHtml(value, editing)).toBeDefined();
        });
      });
    });
  });
});
