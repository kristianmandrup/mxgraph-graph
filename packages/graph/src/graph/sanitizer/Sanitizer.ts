import html_sanitize from "sanitize-html";

export class Sanitizer {
  /**
   * Sanitizes the given HTML markup.
   */
  static sanitizeHtml(value, _editing?) {
    // Uses https://code.google.com/p/google-caja/wiki/JsHtmlSanitizer
    // NOTE: Original minimized sanitizer was modified to support
    // data URIs for images, mailto and special data:-links.
    // LATER: Add MathML to whitelisted tags
    function urlX(link) {
      if (
        link != null &&
        link.toString().toLowerCase().substring(0, 11) !== "javascript:"
      ) {
        return link;
      }

      return null;
    }
    function idX(id) {
      return id;
    }

    return html_sanitize(value, urlX, idX);
  }
}
