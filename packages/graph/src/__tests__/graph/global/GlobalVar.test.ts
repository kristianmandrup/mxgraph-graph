import { GlobalVar } from "../../../graph";

describe("GlobalVar", () => {
  describe("methods", () => {
    describe("getGlobalVariable(name)", () => {
      describe("date", () => {
        it("formatted current date", () => {
          const val = GlobalVar.getGlobalVariable("date");
          expect(val).toEqual(new Date().toLocaleDateString());
        });
      });
    });
  });
});
