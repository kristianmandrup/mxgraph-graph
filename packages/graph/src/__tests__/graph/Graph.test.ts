import { Graph } from "../../graph";

describe("Graph", () => {
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
          expect(instance.defaultScrollbars).toBeDefined();
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
        it("is true", () => {
          expect(instance.transparentBackground).toBeTruthy();
        });
      });

      describe("selectParentAfterDelete", () => {
        it("is false", () => {
          expect(instance.selectParentAfterDelete).toBeFalsy();
        });
      });

      describe("defaultEdgeLength", () => {
        it("is 80", () => {
          expect(instance.defaultEdgeLength).toEqual(80);
        });
      });

      describe("edgeMode", () => {
        it("is false", () => {
          expect(instance.edgeMode).toBeFalsy();
        });
      });

      describe("connectionArrowsEnabled", () => {
        it("is true", () => {
          expect(instance.connectionArrowsEnabled).toBeTruthy();
        });
      });

      describe("placeholderPattern", () => {
        it("is set", () => {
          expect(instance.placeholderPattern).toBeDefined();
        });
      });

      describe("absoluteUrlPattern", () => {
        it("is set", () => {
          expect(instance.absoluteUrlPattern).toBeDefined();
        });
      });

      describe("defaultThemeName", () => {
        it("is false", () => {
          expect(instance.defaultThemeName).toEqual("default");
        });
      });

      describe("defaultThemes", () => {
        it("is empty object", () => {
          expect(instance.defaultThemes).toEqual({});
        });
      });

      describe("baseUrl", () => {
        it("is set", () => {
          expect(instance.baseUrl).toBeDefined();
        });
      });

      describe("editAfterInsert", () => {
        it("is false", () => {
          expect(instance.editAfterInsert).toBeFalsy();
        });
      });

      describe("builtInProperties", () => {
        it("is set", () => {
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

      // - UrlChecker class
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
      describe("initLayoutManager()", () => {
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
          const cell = {}; // fake cell
          expect(() => instance.isReplacePlaceholders(cell)).not.toThrow();
        });
      });

      describe("updatePlaceholders()", () => {
        it("update", () => {
          const cell = {}, // fake cell
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
          const target = {}, // fake target
            cells = {}; // fake cells
          expect(instance.isSplitTarget(target, cells, evt)).toBeFalsy();
        });
      });

      describe("getLabel(cell)", () => {
        it("label", () => {
          const cell = {}; // fake cell
          expect(instance.getLabel(cell)).toBeFalsy();
        });
      });

      describe("setGridSize(value)", () => {
        it("label", () => {
          const value = {}; // fake event
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
          const cell = {}; // fake cell
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
          const cells = [{}]; // fake cells
          expect(instance.restoreSelection(cells)).toBeDefined();
        });
      });
      describe("restoreSelection(cells)", () => {
        it("layrs dialog", () => {
          const cells = [{}]; // fake cells
          const evt = {}; // fake event
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
          const cell = {}; // fake cell
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
          const cell = {}; // fake cell
          expect(instance.getLinkForCell(cell)).toBeDefined();
        });
      });
      describe("getCellStyle(cell)", () => {
        it("style", () => {
          const cell = {}; // fake cell
          expect(instance.getCellStyle(cell)).toBeDefined();
        });
      });
      describe("updateAlternateBounds(cell, geo, willCollapse)", () => {
        it("style", () => {
          const cell = {}; // fake cell
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
          const cell = {}; // fake cell
          expect(instance.isContainer(cell)).toBeFalsy();
        });
      });
      describe("isExtendParent(cell)", () => {
        it("is not extend parent", () => {
          const cell = {}; // fake cell
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
          const cell = {}; // fake cell
          expect(instance.isLabelMovable(cell)).toBeFalsy();
        });
      });
      describe("selectAll(parent)", () => {
        it("selects all", () => {
          const parent = {}; // fake parent
          expect(() => instance.selectAll(parent)).not.toThrow();
        });
      });
      describe("selectCells(vertices, edges, parent)", () => {
        it("selects all", () => {
          const parent = {}; // fake parent
          const vertices = [{}],
            edges = [{}];
          expect(() =>
            instance.selectCells(vertices, edges, parent)
          ).not.toThrow();
        });
      });
      describe("getSwimlaneAt(x, y, parent)", () => {
        it("selects all", () => {
          const parent = {}; // fake parent
          const x = 0,
            y = 0;
          expect(() => instance.getSwimlaneAt(x, y, parent)).not.toThrow();
        });
      });
      describe("isCellFoldable(cell)", () => {
        it("is not foldable", () => {
          const cell = {}; // fake cell
          expect(instance.isCellFoldable(cell)).toBeFalsy();
        });
      });

      describe("reset()", () => {
        it("selects all", () => {
          expect(() => instance.reset()).not.toThrow();
        });
      });

      // - Extract into Zoom class
      describe("zoom(factor, center)", () => {
        it("selects all", () => {
          const factor = 1,
            center = 1;
          expect(() => instance.zoom(factor, center)).not.toThrow();
        });
      });
      describe("zoom(factor, center)", () => {
        it("selects all", () => {
          const factor = 1,
            center = 1;
          expect(() => instance.zoom(factor, center)).not.toThrow();
        });
      });
      describe("zoomIn()", () => {
        it("does not throw", () => {
          expect(() => instance.zoomIn()).not.toThrow();
        });
      });
      describe("zoomOut()", () => {
        it("does not throw", () => {
          expect(() => instance.zoomOut()).not.toThrow();
        });
      });
      describe("getTooltipForCell(cell)", () => {
        it("tooltip", () => {
          const cell = {};
          expect(instance.getTooltipForCell(cell)).toBeDefined();
        });
      });

      // - StrBytesConvert class
      describe("stringToBytes(str)", () => {
        it("to bytes", () => {
          const str = "x";
          expect(instance.stringToBytes(str)).toBeDefined();
        });
      });
      describe("bytesToString(arr)", () => {
        it("to str", () => {
          const arr = ["x"];
          expect(instance.bytesToString(arr)).toBeDefined();
        });
      });

      // - Compress class
      describe("compressNode(node)", () => {
        it("compressed", () => {
          const node = {};
          expect(instance.compressNode(node)).toBeDefined();
        });
      });
      describe("compress(data, deflate)", () => {
        it("compressed", () => {
          const data = "x";
          const deflate = false;
          expect(instance.compress(data, deflate)).toBeDefined();
        });
      });
      describe("compress(data, deflate)", () => {
        it("decompressed", () => {
          const data = "x";
          const inflate = false;
          expect(instance.decompress(data, inflate)).toBeDefined();
        });
      });
      describe("zapGremlins(text)", () => {
        it("decompressed", () => {
          const text = "x";
          expect(instance.zapGremlins(text)).toBeDefined();
        });
      });

      describe("createParent(parent, child, childCount)", () => {
        it("decompressed", () => {
          const parent = {}; // fake parent
          const child = {},
            childCount = 1;
          expect(
            instance.createParent(parent, child, childCount)
          ).toBeDefined();
        });
      });

      describe("createTable(rowCount, colCount, w, h)", () => {
        it("table", () => {
          const rowCount = 1,
            colCount = 1,
            w = 100,
            h = 100;
          expect(instance.createTable(rowCount, colCount, w, h)).toBeDefined();
        });
      });
      // - GraphSwimlane class
      describe("createCrossFunctionalSwimlane(rowCount, colCount, w, h)", () => {
        it("swimlane", () => {
          const rowCount = 1,
            colCount = 1,
            w = 100,
            h = 100;
          expect(
            instance.createCrossFunctionalSwimlane(rowCount, colCount, w, h)
          ).toBeDefined();
        });
      });

      // - GraphTable class
      describe("isTableCell(cell)", () => {
        it("is not table cell", () => {
          const cell = {}; // fake cell
          expect(instance.isTableCell(cell)).toBeFalsy();
        });
      });
      describe("isTableRow(cell)", () => {
        it("is not table row", () => {
          const cell = {}; // fake cell
          expect(instance.isTableRow(cell)).toBeFalsy();
        });
      });
      describe("isTable(cell)", () => {
        it("is not table", () => {
          const cell = {}; // fake cell
          expect(instance.isTable(cell)).toBeFalsy();
        });
      });

      describe("tableResized(table)", () => {
        it("is resized", () => {
          const table = {}; // fake table
          expect(instance.tableResized(table)).toBeDefined();
        });
      });
      describe("tableRowResized(row, bounds, prev)", () => {
        it("is resized", () => {
          const row = 0,
            bounds = {},
            prev = {};
          expect(instance.tableRowResized(row, bounds, prev)).toBeDefined();
        });
      });
      describe("tableCellResized(cell, bounds, prev)", () => {
        it("is resized", () => {
          const cell = 0; // fake cell
          const bounds = {},
            prev = {};
          expect(instance.tableCellResized(cell, bounds, prev)).toBeDefined();
        });
      });

      describe("getActualStartSize(swimlane, ignoreState)", () => {
        it("size", () => {
          const swimlane = {},
            ignoreState = false;
          expect(
            instance.getActualStartSize(swimlane, ignoreState)
          ).toBeDefined();
        });
      });
      describe("setRowHeight(row, height)", () => {
        it("set", () => {
          const row = 0,
            height = 0;
          expect(() => instance.setRowHeight(row, height)).not.toThrow();
        });
      });
      describe("getPagePadding()", () => {
        it("padding", () => {
          expect(instance.getPagePadding()).toBeDefined();
        });
      });

      // - GraphCells class
      describe("createCellLookup(cells, lookup)", () => {
        it("creates", () => {
          const cells = [{}]; // fake cells
          const lookup = true;
          expect(() => instance.createCellLookup(cells, lookup)).not.toThrow();
        });
      });
      describe("createCellMapping(mapping, lookup, cellMapping)", () => {
        it("mapping", () => {
          const cellMapping = {};
          const lookup = true,
            mapping = true;
          expect(
            instance.createCellMapping(mapping, lookup, cellMapping)
          ).toBeDefined();
        });
      });
      describe("encodeCells(cells)", () => {
        it("encoded - no throw", () => {
          const cells = [{}]; // fake cells
          expect(() => instance.encodeCells(cells)).not.toThrow();
        });
      });
      describe("moveCells(cells, dx, dy, clone, target, evt, mapping)", () => {
        it("move - no throw", () => {
          const cells = [{}]; // fake cells
          const dx = 0,
            dy = 0;
          const clone = true,
            target = {};
          const evt = {},
            mapping = {};
          expect(() =>
            instance.moveCells(cells, dx, dy, clone, target, evt, mapping)
          ).not.toThrow();
        });
      });

      // - CustomLinks class
      describe("updateCustomLinks(mapping, cells)", () => {
        it("updated - no throw", () => {
          const cells = [{}]; // fake cells
          const mapping = {};
          expect(() =>
            instance.updateCustomLinks(mapping, cells)
          ).not.toThrow();
        });
      });
      describe("updateCustomLinksForCell(mapping, cells)", () => {
        it("updated - no throw", () => {
          const cell = {}; // fake cell
          const mapping = {};
          expect(() =>
            instance.updateCustomLinksForCell(mapping, cell)
          ).not.toThrow();
        });
      });
      describe("getAllConnectionConstraints(terminal, source)", () => {
        it("constraints", () => {
          const terminal = {},
            source = {};
          expect(
            instance.getAllConnectionConstraints(terminal, source)
          ).toBeDefined();
        });
      });
      describe("flipEdge(edge)", () => {
        it("constraints", () => {
          const edge = {};
          expect(() => instance.flipEdge(edge)).not.toThrow();
        });
      });

      describe("isValidRoot(cell)", () => {
        it("is not valid", () => {
          const cell = {};
          expect(instance.isValidRoot(cell)).toBeFalsy();
        });
      });
      describe("isValidDropTarget(cell)", () => {
        it("is not valid", () => {
          const cell = {};
          expect(instance.isValidDropTarget(cell)).toBeFalsy();
        });
      });
      describe("isExtendParentsOnAdd(cell)", () => {
        it("is not", () => {
          const cell = {};
          expect(instance.isExtendParentsOnAdd(cell)).toBeFalsy();
        });
      });
      describe("createGroupCell()", () => {
        it("creates group", () => {
          expect(instance.createGroupCell()).toBeDefined();
        });
      });

      describe("getPreferredSizeForCell(cell)", () => {
        it("size", () => {
          const cell = {};
          expect(instance.getPreferredSizeForCell(cell)).toBeDefined();
        });
      });

      describe("getDropTarget(cells, evt, cell, clone)", () => {
        it("drop target", () => {
          const cells = [{}];
          const evt = {},
            cell = {},
            clone = false;
          expect(instance.getDropTarget(cells, evt, cell, clone)).toBeDefined();
        });
      });

      describe("addText(x, y, state)", () => {
        it("adds", () => {
          const x = 0,
            y = 0,
            state = {};
          expect(() => instance.addText(x, y, state)).not.toThrow();
        });
      });

      describe("insertImage(newValue, w, h)", () => {
        it("inserts", () => {
          const newValue = {},
            w = 0,
            h = 0;
          expect(() => instance.insertImage(newValue, w, h)).not.toThrow();
        });
      });

      describe("isCloneEvent(evt)", () => {
        it("is not clone", () => {
          const evt = {};
          expect(instance.isCloneEvent(evt)).toBeFalsy();
        });
      });
    });
  });
});
