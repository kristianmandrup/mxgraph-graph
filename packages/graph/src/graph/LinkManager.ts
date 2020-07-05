import mx from "@mxgraph-app/mx";
import { Graph } from "./Graph";
import { UrlChecker } from "./UrlChecker";
import resources from "@mxgraph-app/resources";
const { urlParams } = resources;

const { mxEvent } = mx;

export class LinkManager {
  graph: Graph;

  /**
   * Sets the policy for links. Possible values are "self" to replace any framesets,
   * "blank" to load the URL in <linkTarget> and "auto" (default).
   */
  linkPolicy =
    urlParams["target"] == "frame" ? "blank" : urlParams["target"] || "auto";

  /**
   * Target for links that open in a new window. Default is _blank.
   */
  linkTarget = urlParams["target"] == "frame" ? "_self" : "_blank";

  /**
   * Value to the rel attribute of links. Default is 'nofollow noopener noreferrer'.
   * NOTE: There are security implications when this is changed and if noopener is removed,
   * then <openLink> must be overridden to allow for the opener to be set by default.
   */
  linkRelation = "nofollow noopener noreferrer";

  domainUrl: any;
  baseUrl: any;
  urlChecker: any;

  constructor($graph: Graph) {
    this.graph = $graph.graph;
    this.urlChecker = new UrlChecker($graph);
  }

  get isEnabled() {
    return this.graph.isEnabled;
  }

  isRelativeUrl(href) {
    return this.urlChecker.isRelativeUrl(href);
  }

  getAbsoluteUrl(href) {
    return this.urlChecker.getAbsoluteUrl(href);
  }

  isExternalProtocol(href) {
    return this.urlChecker.isExternalProtocol(href);
  }

  isCellLocked(cell) {
    return this.graph.isCellLocked(cell);
  }

  /**
   * Installs automatic layout via styles
   */
  labelLinkClicked(state, elem, evt) {
    var href = elem.getAttribute("href");

    if (
      (href != null &&
        !this.isCustomLink(href) &&
        mxEvent.isLeftMouseButton(evt) &&
        !mxEvent.isPopupTrigger(evt)) ||
      mxEvent.isTouchEvent(evt)
    ) {
      if (!this.isEnabled() || this.isCellLocked(state.cell)) {
        var target = this.isBlankLink(href) ? this.linkTarget : "_top";
        this.openLink(this.getAbsoluteUrl(href), target);
      }

      mxEvent.consume(evt);
    }
  }

  /**
   * Hook for links to open in same window. Default returns true for anchors,
   * links to same domain or if target == 'self' in the config.
   */
  isBlankLink(href) {
    return (
      !this.isExternalProtocol(href) &&
      (this.linkPolicy === "blank" ||
        (this.linkPolicy !== "self" &&
          !this.isRelativeUrl(href) &&
          href.substring(0, this.domainUrl.length) !== this.domainUrl))
    );
  }

  /**
   * Returns the size of the page format scaled with the page size.
   */
  openLink(href, target, allowOpener?) {
    var result: any = window;

    try {
      // Workaround for blocking in same iframe
      if (target == "_self" && window != window.top) {
        window.location.href = href;
      } else {
        // Avoids page reload for anchors (workaround for IE but used everywhere)
        if (
          href.substring(0, this.baseUrl.length) == this.baseUrl &&
          href.charAt(this.baseUrl.length) == "#" &&
          target == "_top" &&
          window == window.top
        ) {
          var hash = href.split("#")[1];

          // Forces navigation if on same hash
          if (window.location.hash == "#" + hash) {
            window.location.hash = "";
          }

          window.location.hash = hash;
        } else {
          result = window.open(href, target != null ? target : "_blank");

          if (result != null && !allowOpener) {
            result.opener = null;
          }
        }
      }
    } catch (e) {
      // ignores permission denied
    }

    return result;
  }

  /**
   * Adds support for page links.
   */
  getLinkTitle(href) {
    return href.substring(href.lastIndexOf("/") + 1);
  }

  /**
   * Adds support for page links.
   */
  isCustomLink(href) {
    return href.substring(0, 5) == "data:";
  }

  /**
   * Adds support for page links.
   */
  customLinkClicked(_link) {
    return false;
  }
}
