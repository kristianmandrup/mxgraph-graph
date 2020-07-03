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
      // openLink(href, target, allowOpener?)
      // getLinkTitle(href)
      // isCustomLink(href)
      // customLinkClicked(_link)
      // isExternalProtocol(href)
      // isBlankLink(href)

      // - Url class
      // isRelativeUrl(url)
      // getAbsoluteUrl(url)

      // - GraphLayoutManager class
      // initLayoutManager()

      // - Page class
      // getPageSize()
      // getPageLayout()

      // sanitizeHtml(value, _editing?)

      // - Placeholders class
      // updatePlaceholders()
      // isReplacePlaceholders(cell)
      // replacePlaceholders(cell, str)

      // - Zoom wheel class
      // isZoomWheelEvent(evt)
      // isScrollWheelEvent(evt)

      // isTransparentClickEvent(evt)
      // isIgnoreTerminalEvent(evt)
      // isSplitTarget(target, cells, evt)
      // getLabel(cell)
      // setGridSize(value)
      // fireEvent(_event)
      // getClickableLinkForCell(cell)
      // getGlobalVariable(name)

      // - DateFormat class
      // formatDate(date, mask, utc?) - EXTRACT into class

      // - Layers class
      // createLayersDialog()

      // restoreSelection(cells)
      // selectCellsForConnectVertex(cells, evt, hoverIcons)

      // - ConnectVertex class
      // connectVertex(source, direction, length, evt, forceClone, ignoreCellAt) - EXTRACT into class

      // getIndexableText()
      // convertValueToString(cell)

      // - Link class
      // getLinksForState(state)
      // getLinkForCell(cell)

      // getCellStyle(cell)
      // updateAlternateBounds(cell, geo, willCollapse)
      // isMoveCellsEvent(evt, state)
      // foldCells(collapse, recurse, cells, checkFoldable, evt)
      // moveSiblings(state, parent, dx, dy)
      // resizeParentStacks(parent, layout, dx, dy)
      // isContainer(cell)
      // isExtendParent(cell)
      // isCellConnectable(cell)
      // isLabelMovable(cell)
      // selectAll(parent)
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
