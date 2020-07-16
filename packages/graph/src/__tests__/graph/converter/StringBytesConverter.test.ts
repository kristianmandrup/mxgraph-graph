import { StringBytesConverter } from "../../../graph";

describe("StringBytesConverter", () => {
  describe("static", () => {
    describe("methods", () => {
      describe("stringToBytes", () => {
        const str = "xyz";
        it("is true", () => {
          expect(() => StringBytesConverter.stringToBytes(str)).not.toThrow();
        });
      });

      describe("bytesToString", () => {
        const arr = ["xyz"];
        it("is true", () => {
          expect(() => StringBytesConverter.bytesToString(arr)).not.toThrow();
        });
      });
    });
  });
});
