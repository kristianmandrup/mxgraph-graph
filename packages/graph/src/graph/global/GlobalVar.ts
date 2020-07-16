import { DateFormatter } from "../date/DateFormatter";

export class GlobalVar {
  /**
   * Private helper method.
   */
  static getGlobalVariable(name) {
    var val: any;

    if (name == "date") {
      val = new Date().toLocaleDateString();
    } else if (name == "time") {
      val = new Date().toLocaleTimeString();
    } else if (name == "timestamp") {
      val = new Date().toLocaleString();
    } else if (name.substring(0, 5) == "date{") {
      var fmt = name.substring(5, name.length - 1);
      val = DateFormatter.formatDate(new Date(), fmt);
    }

    return val;
  }
}
