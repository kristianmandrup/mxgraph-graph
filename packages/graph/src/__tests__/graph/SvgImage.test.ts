import { SvgImage } from "../../graph";

describe("SvgImage", () => {
  describe("static", () => {
    describe("methods", () => {
      describe("encode(data)", () => {
        const data = "xyz";
        it("encodes", () => {
          expect(SvgImage.encode(data)).not.toThrow();
        });
      });

      describe("create", () => {
        describe("create(w, h, data, coordWidth, coordHeight)", () => {
          const w = 0,
            h = 0,
            data = "x",
            coordWidth = 100,
            coordHeight = 100;
          it("is true", () => {
            expect(() =>
              SvgImage.create(w, h, data, coordWidth, coordHeight)
            ).not.toThrow();
          });
        });
      });
    });
  });
});
