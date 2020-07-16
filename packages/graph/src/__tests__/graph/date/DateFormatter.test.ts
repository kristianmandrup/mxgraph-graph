import { DateFormatter } from "../../../graph";

describe("DateFormatter", () => {
  describe("methods", () => {
    describe("formatDate", () => {
      const date = new Date().setFullYear(2019, 10, 20);
      const mask = "yy/mm/dd";

      describe("formatDate(date, mask)", () => {
        const node = {},
          checked = true;
        it("formatted date", () => {
          expect(DateFormatter.formatDate(date, mask)).toBeDefined();
        });
      });

      describe("formatDate(date, mask, utc)", () => {
        const utc = "GMT";
        it("formatted date - UTC", () => {
          expect(DateFormatter.formatDate(date, mask, utc)).toBeDefined();
        });
      });
    });
  });
});
