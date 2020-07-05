import { Zapper } from "../../graph";

describe("Zapper", () => {
  describe("static", () => {
    describe("methods", () => {
      describe("zapGremlins(text)", () => {
        it("zaps it", () => {
          const text = "x";
          expect(Zapper.zapGremlins(text)).toBe("x");
        });
      });
    });
  });
});
