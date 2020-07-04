import { Graph } from "../../graph";

describe("MouseUp", () => {
  const opts = {};
  const model = {};
  const container = document.createElement("div");

  let instance, graph;

  beforeEach(() => {
    instance = new Graph(container, model, opts);
  });

  describe("static", () => {
    describe("properties", () => {
      describe("touchStyle", () => {
        it("is true", () => {
          expect(Graph.touchStyle).toBeTruthy();
        });
      });

      describe("fileSupport", () => {
        it("is true", () => {
          expect(Graph.fileSupport).toBeTruthy();
        });
      });

      describe("lineJumpsEnabled", () => {
        it("is true", () => {
          expect(Graph.lineJumpsEnabled).toBeTruthy();
        });
      });

      describe("lineJumpsEnabled", () => {
        it("is true", () => {
          expect(Graph.lineJumpsEnabled).toBeTruthy();
        });
      });

      describe("defaultJumpSize", () => {
        it("is true", () => {
          expect(Graph.defaultJumpSize).toEqual(6);
        });
      });

      describe("minTableColumnWidth", () => {
        it("is true", () => {
          expect(Graph.minTableColumnWidth).toEqual(20);
        });
      });

      describe("minTableRowHeight", () => {
        it("is true", () => {
          expect(Graph.minTableRowHeight).toEqual(20);
        });
      });

      describe("foreignObjectWarningText", () => {
        it("is true", () => {
          expect(Graph.foreignObjectWarningText).toEqual(
            "Viewer does not support full SVG 1.1"
          );
        });
      });

      describe("foreignObjectWarningLink", () => {
        it("is true", () => {
          expect(Graph.foreignObjectWarningLink).toEqual(
            "https://desk.draw.io/support/solutions/articles/16000042487"
          );
        });
      });
    });

    describe("methods", () => {
      describe("foreignObjectWarningLink", () => {
        const w = 200,
          h = 200,
          data = "1234";
        it("is true", () => {
          expect(() => Graph.createSvgImage(w, h, data)).not.toThrow();
        });
      });

      describe("foreignObjectWarningLink", () => {
        const text = "xyz";
        it("is true", () => {
          expect(() => Graph.zapGremlins(text)).not.toThrow();
        });
      });

      describe("stringToBytes", () => {
        const str = "xyz";
        it("is true", () => {
          expect(() => Graph.stringToBytes(str)).not.toThrow();
        });
      });

      describe("bytesToString", () => {
        const arr = ["xyz"];
        it("is true", () => {
          expect(() => Graph.bytesToString(arr)).not.toThrow();
        });
      });

      describe("compressNode", () => {
        const node = {},
          checked = true;
        it("is true", () => {
          expect(() => Graph.compressNode(node, checked)).not.toThrow();
        });
      });

      describe("compressNode", () => {
        const data = "abc",
          deflate = true;
        it("is true", () => {
          expect(() => Graph.compress(data, deflate)).not.toThrow();
        });
      });

      describe("compressNode", () => {
        const data = "abc",
          inflate = true,
          checked = true;
        it("is true", () => {
          expect(() => Graph.decompress(data, inflate, checked)).not.toThrow();
        });
      });
    });
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("model", () => {
        it("is set", () => {
          expect(instance.model).toBe(graph.model);
        });
      });

      describe("minFitScale", () => {
        it("is null", () => {
          expect(instance.minFitScale).toBeNull();
        });
      });

      describe("maxFitScale", () => {
        it("is null", () => {
          expect(instance.maxFitScale).toBeNull();
        });
      });

      describe("linkPolicy", () => {
        it("is auto", () => {
          expect(instance.linkPolicy).toEqual("auto");
        });
      });

      describe("linkTarget", () => {
        it("is _self", () => {
          expect(instance.linkTarget).toEqual("_self");
        });
      });

      describe("linkRelation", () => {
        it("is set", () => {
          expect(instance.linkRelation).toEqual("nofollow noopener noreferrer");
        });
      });

      describe("defaultScrollbars", () => {
        it("is set", () => {
          expect(instance.defaultScrollbars).toBeFalsy();
        });
      });

      describe("defaultPageVisible", () => {
        it("is true", () => {
          expect(instance.defaultPageVisible).toBeTruthy();
        });
      });

      describe("lightbox", () => {
        it("is false", () => {
          expect(instance.lightbox).toBeFalsy();
        });
      });

      describe("defaultPageBackgroundColor", () => {
        it("is white", () => {
          expect(instance.defaultPageBackgroundColor).toEqual("#ffffff");
        });
      });

      describe("defaultPageBorderColor", () => {
        it("is white", () => {
          expect(instance.defaultPageBorderColor).toEqual("#ffffff");
        });
      });

      describe("scrollTileSize", () => {
        it("is set", () => {
          expect(instance.scrollTileSize).toBeDefined();
        });
      });

      describe("transparentBackground", () => {
        it("is false", () => {
          expect(instance.transparentBackground).toBeTruthy();
        });
      });

      describe("selectParentAfterDelete", () => {
        it("is false", () => {
          expect(instance.selectParentAfterDelete).toBeFalsy();
        });
      });

      describe("defaultEdgeLength", () => {
        it("is false", () => {
          expect(instance.defaultEdgeLength).toEqual(80);
        });
      });

      describe("edgeMode", () => {
        it("is false", () => {
          expect(instance.edgeMode).toBeFalsy();
        });
      });

      describe("connectionArrowsEnabled", () => {
        it("is false", () => {
          expect(instance.connectionArrowsEnabled).toBeTruthy();
        });
      });

      describe("placeholderPattern", () => {
        it("is false", () => {
          expect(instance.placeholderPattern).toBeDefined();
        });
      });

      describe("absoluteUrlPattern", () => {
        it("is false", () => {
          expect(instance.absoluteUrlPattern).toBeDefined();
        });
      });

      describe("defaultThemeName", () => {
        it("is false", () => {
          expect(instance.defaultThemeName).toEqual("default");
        });
      });

      describe("defaultThemes", () => {
        it("is false", () => {
          expect(instance.defaultThemes).toEqual({});
        });
      });

      describe("baseUrl", () => {
        it("is false", () => {
          expect(instance.baseUrl).toBeDefined();
        });
      });

      describe("editAfterInsert", () => {
        it("is false", () => {
          expect(instance.editAfterInsert).toBeFalsy();
        });
      });

      describe("builtInProperties", () => {
        it("is false", () => {
          expect(instance.builtInProperties).toEqual([
            "label",
            "tooltip",
            "placeholders",
            "placeholder",
          ]);
        });
      });

      describe("standalone", () => {
        it("is false", () => {
          expect(instance.standalone).toBeFalsy();
        });
      });

      describe("cssTransformConfig", () => {
        it("is set", () => {
          expect(instance.cssTransformConfig).toBeDefined();
        });
      });
    });

    describe("getters", () => {
      describe("isLightboxView", () => {
        it("is true", () => {
          expect(instance.isLightboxView).toBeTruthy();
        });
      });

      describe("isViewer", () => {
        it("is false", () => {
          expect(instance.isViewer).toBeFalsy();
        });
      });
    });

    describe("methods", () => {
      describe("getModel()", () => {
        it("is model", () => {
          expect(instance.getModel()).toBeDefined();
        });
      });

      describe("init(container)", () => {
        it("does not throw", () => {
          expect(() => instance.init(container)).not.toThrow();
        });
      });

      describe("labelLinkClicked(state, elem, evt)", () => {
        const state = {};
        const elem = document.createElement("a");
        elem.setAttribute("href", "www.x.com");
        const evt = {};

        it("is false", () => {
          expect(() =>
            instance.labelLinkClicked(state, elem, evt)
          ).not.toThrow();
        });
      });

      // - LinkInfo class
      describe("openLink(href, target, allowOpener?)", () => {
        const href = "www.x.com";
        const target = document.createElement("a");

        it("does not throw", () => {
          expect(() => instance.openLink(href, target)).not.toThrow();
        });
      });

      describe("getLinkTitle(href)", () => {
        const href = "www.x.com";

        it("is the title", () => {
          expect(instance.getLinkTitle(href)).toEqual("x");
        });
      });

      describe("isCustomLink(href)", () => {
        const href = "www.x.com";

        it("is custom", () => {
          expect(instance.isCustomLink(href)).toEqual("x");
        });
      });

      describe("isCustomLink(href)", () => {
        const link = "www.x.com";

        it("is clicked", () => {
          expect(instance.customLinkClicked(link)).toBeDefined();
        });
      });

      describe("isCustomLink(href)", () => {
        const href = "www.x.com";

        it("is external", () => {
          expect(instance.isExternalProtocol(href)).toBeTruthy();
        });
      });

      describe("isBlankLink(href)", () => {
        const href = "www.x.com";

        it("is blank", () => {
          expect(instance.isBlankLink(href)).toBeTruthy();
        });
      });

      // - Url class
      describe("isRelativeUrl(url)", () => {
        it("is relative", () => {
          const url = "/x";
          expect(instance.isRelativeUrl(url)).toBeTruthy();
        });

        it("is not relative", () => {
          const url = "http://www.x.com";
          expect(instance.isRelativeUrl(url)).toBeFalsy();
        });
      });

      describe("getAbsoluteUrl(url)", () => {
        const url = "/x";

        it("absolute", () => {
          expect(instance.getAbsoluteUrl(url)).toBeDefined();
        });
      });

      // - GraphLayoutManager class
      describe("getAbsoluteUrl(url)", () => {
        const url = "/x";

        it("does not throw", () => {
          expect(() => instance.initLayoutManager()).not.toThrow();
        });
      });

      // - Page class
      //
      describe("getPageSize()", () => {
        it("pagesize", () => {
          expect(instance.getPageSize()).toBeDefined();
        });
      });
      describe("getPageLayout()", () => {
        it("pageLayout", () => {
          expect(instance.getPageLayout()).toBeDefined();
        });
      });

      describe("sanitizeHtml(value, editing?)", () => {
        it("sanitized", () => {
          const value = "<h1>hello</h1><script>a</script>";
          expect(instance.sanitizeHtml(value)).toBeDefined();
        });
      });

      // - Placeholders class
      describe("updatePlaceholders()", () => {
        it("update", () => {
          expect(() => instance.updatePlaceholders()).not.toThrow();
        });
      });

      describe("isReplacePlaceholders(cell)", () => {
        it("update", () => {
          const cell = {};
          expect(() => instance.isReplacePlaceholders(cell)).not.toThrow();
        });
      });

      describe("updatePlaceholders()", () => {
        it("update", () => {
          const cell = {},
            str = "xx";
          expect(() => instance.replacePlaceholders(cell, str)).not.toThrow();
        });
      });

      // - Wheel class
      describe("isZoomWheelEvent(evt)", () => {
        it("is zoom", () => {
          const evt = {}; // fake event
          expect(instance.isZoomWheelEvent(evt)).toBeFalsy();
        });
      });
      describe("isScrollWheelEvent(evt)", () => {
        it("is scroll", () => {
          const evt = {}; // fake event
          expect(instance.isScrollWheelEvent(evt)).toBeFalsy();
        });
      });

      describe("isTransparentClickEvent(evt)", () => {
        it("is scroll", () => {
          const evt = {}; // fake event
          expect(instance.isTransparentClickEvent(evt)).toBeFalsy();
        });
      });
      describe("isIgnoreTerminalEvent(evt)", () => {
        it("is terminal", () => {
          const evt = {}; // fake event
          expect(instance.isIgnoreTerminalEvent(evt)).toBeFalsy();
        });
      });

      describe("isIgnoreTerminalEvent(evt)", () => {
        it("is split target", () => {
          const evt = {}; // fake event
          const target = {},
            cells = {};
          expect(instance.isSplitTarget(target, cells, evt)).toBeFalsy();
        });
      });

      describe("getLabel(cell)", () => {
        it("label", () => {
          const cell = {};
          expect(instance.getLabel(cell)).toBeFalsy();
        });
      });

      describe("setGridSize(value)", () => {
        it("label", () => {
          const value = {};
          expect(instance.setGridSize(value)).toBeDefined();
        });
      });

      describe("fireEvent", () => {
        it("fires event", () => {
          const event = {};
          expect(() => instance.fireEvent(event)).not.toThrow();
        });
      });

      describe("getClickableLinkForCell(cell)", () => {
        it("clickable link", () => {
          const cell = {};
          expect(() => instance.getClickableLinkForCell(cell)).not.toThrow();
        });
      });

      describe("getGlobalVariable(name)", () => {
        it("clickable link", () => {
          const name = "x";
          expect(() => instance.getGlobalVariable(name)).not.toThrow();
        });
      });

      // - DateFormat class
      // formatDate(date, mask, utc?) - EXTRACT into class
      describe("getGlobalVariable(name)", () => {
        it("clickable link", () => {
          const date = new Date();
          const mask = "yy/MM/dd";
          expect(instance.formatDate(date, mask)).toBeDefined();
        });
      });

      // - Layers class
      describe("createLayersDialog()", () => {
        it("layrs dialog", () => {
          expect(instance.createLayersDialog()).toBeDefined();
        });
      });
      describe("restoreSelection(cells)", () => {
        it("layrs dialog", () => {
          const cells = [{}];
          expect(instance.restoreSelection(cells)).toBeDefined();
        });
      });
      describe("restoreSelection(cells)", () => {
        it("layrs dialog", () => {
          const cells = [{}];
          const evt = {};
          const hoverIcons = ["add"];
          expect(
            instance.selectCellsForConnectVertex(cells, evt, hoverIcons)
          ).not.toThrow();
        });
      });

      // - ConnectVertex class
      //  - EXTRACT into class
      describe("restoreSelection(cells)", () => {
        it("layrs dialog", () => {
          const source = {};
          const direction = "left";
          const length = 1;
          const forceClone = false;
          const ignoreCellAt = [];
          const evt = {};
          expect(() =>
            instance.connectVertex(
              source,
              direction,
              length,
              evt,
              forceClone,
              ignoreCellAt
            )
          ).not.toThrow();
        });
      });

      describe("getIndexableText()", () => {
        it("text", () => {
          expect(instance.getIndexableText()).toBeDefined();
        });
      });
      describe("getIndexableText()", () => {
        it("string", () => {
          const cell = {};
          expect(instance.convertValueToString(cell)).toBeDefined();
        });
      });

      // - Link class
      describe("getLinksForState(state)", () => {
        it("links", () => {
          const state = {};
          expect(instance.getLinksForState(state)).toBeDefined();
        });
      });
      describe("getLinkForCell(cell)", () => {
        it("link", () => {
          const cell = {};
          expect(instance.getLinkForCell(cell)).toBeDefined();
        });
      });
      describe("getCellStyle(cell)", () => {
        it("style", () => {
          const cell = {};
          expect(instance.getCellStyle(cell)).toBeDefined();
        });
      });
      describe("updateAlternateBounds(cell, geo, willCollapse)", () => {
        it("style", () => {
          const cell = {};
          const geo = {};
          const willCollapse = false;
          expect(() =>
            instance.updateAlternateBounds(cell, geo, willCollapse)
          ).not.toThrow();
        });
      });

      describe("isMoveCellsEvent(evt, state)", () => {
        it("is terminal", () => {
          const evt = {}; // fake event
          const state = {};
          expect(instance.isMoveCellsEvent(evt, state)).toBeFalsy();
        });
      });

      describe("foldCells(collapse, recurse, cells, checkFoldable, evt)", () => {
        it("does not throw", () => {
          const evt = {}; // fake event
          const collapse = true,
            recurse = false,
            cells = [{}],
            checkFoldable = false;
          expect(() =>
            instance.foldCells(collapse, recurse, cells, checkFoldable, evt)
          ).not.toThrow();
        });
      });

      describe("moveSiblings(state, parent, dx, dy)", () => {
        it("does not throw", () => {
          const dx = 0,
            dy = 0;
          const state = {};
          expect(() =>
            instance.moveSiblings(state, parent, dx, dy)
          ).not.toThrow();
        });
      });

      describe("resizeParentStacks(parent, layout, dx, dy)", () => {
        it("does not throw", () => {
          const dx = 0,
            dy = 0;
          const parent = {};
          const layout = {};
          expect(() =>
            instance.resizeParentStacks(parent, layout, dx, dy)
          ).not.toThrow();
        });
      });

      describe("isContainer(cell)", () => {
        it("is not container", () => {
          const cell = {}; // fake event
          expect(instance.isContainer(cell)).toBeFalsy();
        });
      });
      describe("isExtendParent(cell)", () => {
        it("is not extend parent", () => {
          const cell = {}; // fake event
          expect(instance.isExtendParent(cell)).toBeFalsy();
        });
      });
      describe("isCellConnectable(cell)", () => {
        it("is not connectable", () => {
          const cell = {}; // fake event
          expect(instance.isCellConnectable(cell)).toBeFalsy();
        });
      });
      describe("isLabelMovable(cell)", () => {
        it("is not movable", () => {
          const cell = {}; // fake event
          expect(instance.isLabelMovable(cell)).toBeFalsy();
        });
      });
      describe("selectAll(parent)", () => {
        it("selects all", () => {
          const cell = {}; // fake event
          expect(() => instance.selectAll(parent)).not.toThrow();
        });
      });

      // selectCells(vertices, edges, parent)
      // getSwimlaneAt(x, y, parent)
      // isCellFoldable(cell)
      // reset()

      // - Extract into Zoom class
      // zoom(factor, center?)
      // zoomIn()
      // zoomOut()
      // getTooltipForCell(cell)

      // - StrBytesConvert class
      // stringToBytes(str)
      // bytesToString(arr)

      // - Compress class
      // compressNode(node)
      // compress(data, deflate)
      // decompress(data, inflate)

      // zapGremlins(text)
      // createParent(parent, child, childCount)
      // createTable(rowCount, colCount, w, h)

      // - GraphSwimlane class
      // createCrossFunctionalSwimlane(rowCount, colCount, w, h)

      // - GraphTable class
      // isTableCell(cell)
      // isTableRow(cell)
      // isTable(cell)
      // tableResized(table)
      // tableRowResized(row, bounds, prev)
      // tableCellResized(cell, bounds, prev)

      // getActualStartSize(swimlane, ignoreState?)
      // setRowHeight(row, height)
      // getPagePadding()

      // - GraphCells class
      // createCellLookup(cells, lookup)
      // createCellMapping(mapping, lookup, cellMapping)
      // encodeCells(cells)
      // moveCells(cells, dx, dy, clone, target, evt, mapping)

      // - CustomLinks class
      // updateCustomLinks(mapping, cells)
      // updateCustomLinksForCell(_mapping, _cell)

      // getAllConnectionConstraints(terminal, _source)
      // flipEdge(edge)
      // isValidRoot(cell)
      // isValidDropTarget(cell)
      // createGroupCell()
      // isExtendParentsOnAdd(cell)
      // getPreferredSizeForCell(cell)
      // getDropTarget(cells, evt, cell, clone)
      // addText(x, y, state)
      // insertImage(newValue, w, h)
      // isCloneEvent(evt)
    });
  });
});
