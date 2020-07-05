import { Compresser } from "../../graph";

describe("Compresser", () => {
  describe("methods", () => {
    describe("compressNode(node, checked)", () => {
      const node = {},
        checked = true;
      it("is true", () => {
        expect(() => Compresser.compressNode(node, checked)).not.toThrow();
      });
    });

    describe("compress(data, deflate)", () => {
      const data = "abc",
        deflate = true;
      it("is true", () => {
        expect(() => Compresser.compress(data, deflate)).not.toThrow();
      });
    });

    describe("decompress(data, inflate, checked)", () => {
      const data = "abc",
        inflate = true,
        checked = true;
      it("is true", () => {
        expect(() =>
          Compresser.decompress(data, inflate, checked)
        ).not.toThrow();
      });
    });
  });
});
