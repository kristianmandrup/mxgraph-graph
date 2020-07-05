import { Graph } from "./Graph";
import resources from "@mxgraph-app/resources";
const { urlParams } = resources;

export class UrlChecker {
  graph: Graph;

  /**
   * Specifies the regular expression for matching placeholders.
   */
  absoluteUrlPattern = new RegExp("^(?:[a-z]+:)?//", "i");

  /**
   * Base URL for relative links.
   */
  baseUrl =
    urlParams["base"] != null
      ? decodeURIComponent(urlParams["base"])
      : (window != window.top
          ? document.referrer
          : document.location.toString()
        ).split("#")[0];

  domainUrl: any;
  domainPathUrl: any;

  constructor($graph: Graph) {
    this.graph = $graph.graph;
    const { domainPathUrl, domainUrl } = $graph;
    this.domainUrl = domainUrl;
    this.domainPathUrl = domainPathUrl;
  }

  /**
   * Returns true if the given href references an external protocol that
   * should never open in a new window. Default returns true for mailto.
   */
  isExternalProtocol(href) {
    return href.substring(0, 7) === "mailto:";
  }

  /**
   *
   */
  isRelativeUrl(url) {
    return (
      url != null &&
      !this.absoluteUrlPattern.test(url) &&
      url.substring(0, 5) !== "data:" &&
      !this.isExternalProtocol(url)
    );
  }

  /**
   *
   */
  getAbsoluteUrl(url) {
    if (url != null && this.isRelativeUrl(url)) {
      if (url.charAt(0) == "#") {
        url = this.baseUrl + url;
      } else if (url.charAt(0) == "/") {
        url = this.domainUrl + url;
      } else {
        url = this.domainPathUrl + url;
      }
    }

    return url;
  }
}
