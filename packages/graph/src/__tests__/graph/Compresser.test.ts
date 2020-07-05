import { Compresser } from "../../graph";

describe("Compresser", () => {
  describe("compressNode", () => {
    const node = {},
      checked = true;
    it("is true", () => {
      expect(() => Compresser.compressNode(node, checked)).not.toThrow();
    });
  });

  describe("compressNode", () => {
    const data = "abc",
      deflate = true;
    it("is true", () => {
      expect(() => Compresser.compress(data, deflate)).not.toThrow();
    });
  });

  describe("compressNode", () => {
    const data = "abc",
      inflate = true,
      checked = true;
    it("is true", () => {
      expect(() => Compresser.decompress(data, inflate, checked)).not.toThrow();
    });
  });
});
