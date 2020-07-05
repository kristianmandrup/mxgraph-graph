import { WheelEvent } from "../../graph";

describe("WheelEvent", () => {
  describe("methods", () => {
    describe("isZoomWheelEvent(evt)", () => {
      const evt = {};
      it("is true", () => {
        expect(() => WheelEvent.isZoomWheelEvent(evt)).not.toThrow();
      });
    });

    describe("isScrollWheelEvent(evt)", () => {
      const evt = {};
      it("is true", () => {
        expect(() => WheelEvent.isScrollWheelEvent(evt)).not.toThrow();
      });
    });
  });
});
