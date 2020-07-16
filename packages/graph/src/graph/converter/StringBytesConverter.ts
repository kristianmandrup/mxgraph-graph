export class StringBytesConverter {
  /**
   * Turns the given string into an array.
   */
  static stringToBytes(str) {
    var arr = new Array(str.length);

    for (var i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i);
    }

    return arr;
  }

  /**
   * Turns the given array into a string.
   */
  static bytesToString(arr) {
    var result = new Array(arr.length);

    for (var i = 0; i < arr.length; i++) {
      result[i] = String.fromCharCode(arr[i]);
    }

    return result.join("");
  }
}
