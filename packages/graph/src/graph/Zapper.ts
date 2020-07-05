export class Zapper {
  /**
   * Removes all illegal control characters with ASCII code <32 except TAB, LF
   * and CR.
   */
  static zapGremlins(text) {
    var checked: any[] = [];

    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i);

      // Removes all control chars except TAB, LF and CR
      if (
        (code >= 32 || code == 9 || code == 10 || code == 13) &&
        code != 0xffff &&
        code != 0xfffe
      ) {
        checked.push(text.charAt(i));
      }
    }

    return checked.join("");
  }
}
