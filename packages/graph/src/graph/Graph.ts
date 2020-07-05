import mx from "@mxgraph-app/mx";
import { SvgImage } from "./SvgImage";
import { CellTooltip } from "./CellTooltip";
import { LayersDialog } from "./LayersDialog";

type GraphOpts = { renderHint?; stylesheet?; themes?; standalone? };

const {
  mxGeometry,
  mxCell,
  mxConnectionConstraint,
  mxDictionary,
  mxGraphModel,
  mxCodec,
  mxStackLayout,
  mxObjectIdentity,
  mxRectangle,
  mxEventObject,
  mxConstants,
  mxClient,
  mxPoint,
  mxEvent,
  mxGraph,
  mxUtils,
} = mx;

import resources from "@mxgraph-app/resources";
import { GraphContainerInitializer } from "./GraphContainerInitializer";
import { GraphCssTransformConfig } from "./css";
import { LinkManager } from "./LinkManager";
import { Zapper } from "./Zapper";
import { Compresser } from "./Compresser";
import { Sanitizer } from "./Sanitizer";
import { PlaceholderManager } from "./PlaceholderManager";
import { CustomLinks } from "./CustomLinks";
import { TableChecker } from "./TableChecker";
import { VertexConnecter } from "./VertexConnecter";
import { StringBytesConverter } from "./StringBytesConverter";
import { Zoomer } from "./Zoomer";
import { WheelEvent } from "./WheelEvent";
import { GraphInitializer } from "../initializer";
import { GlobalVar } from "./GlobalVar";
import { DateFormatter } from "./DateFormatter";
import { ValueConverter } from "./ValueConverter";
import { LabelExtracter } from "./LabelExtracter";
import { CellFolder } from "./CellFolder";
const { urlParams } = resources;

/**
 * Constructs a new graph instance. Note that the constructor does not take a
 * container because the graph instance is needed for creating the UI, which
 * in turn will create the container for the graph. Hence, the container is
 * assigned later in EditorUi.
 */
/**
 * Defines graph class.
 */
export class Graph {
  container: any;
  model: any;
  renderHint: any;
  stylesheet: any;
  themes: any;
  currentEdgeStyle: any;
  currentVertexStyle: any;
  defaultEdgeStyle: any;
  defaultVertexStyle: any;
  domainUrl: any;
  domainPathUrl: any;
  isHtmlLabel: any;
  getCurrentCellStyle: any;
  addListener: any;
  addMouseListener: any;
  cellRenderer: any;
  isEnabled: any;
  view: any;
  dateFormatCache: any;
  isCellVisible: any; // (cell) => void
  isSelectionEmpty: any; // () => void
  addCells: any; // ([realTarget], target, null, null, null, true)
  layoutManager: any;
  isCellLocked: any; // (cell) => boolean
  gridSize: any;
  graph: any;
  cloneCell: any; // (cell) => any
  getCellsBeyond: any; // (cell) => [any]
  zoomFactor: any;
  setSelectionCells: any; // (cell) => void
  setSelectionCell: any; // (cell) => void
  getCellGeometry: any; // (cell) => any
  clearSelection: any; // () => void
  scrollCellToVisible: any; // (cell) => any
  isSwimlane: any; // (cell) => boolean
  getCompositeParent: any; // (cell) => any
  createCurrentEdgeStyle: any; // () => void
  insertEdge: any; // (mxGraph)
  isCellCollapsed: any; // (cell) => boolean
  getFoldableCells: any; // (cells) => any
  getSelectionCells: any; // () => any
  getDefaultParent: any; // () => any
  foldingEnabled?: boolean;
  isEditing: any; // () => boolean
  stopEditing: any; // (boolean) => void
  escape: any; // () => any
  createVertex: any; //
  cloneCells: any; // (cells, null, cloneMap) => void
  setCellStyles: any; // (style, value, edges) => void
  autoSizeCell: any;
  cellEditor: any;

  setConnectable: any;
  setDropEnabled: any;
  setPanning: any;
  setTooltips: any;
  setAllowLoops: any;
  allowAutoPanning: any;
  resetEdgesOnConnect: any;
  constrainChildren: any;
  constrainRelativeChildren: any;
  getCellAt: any; // (x, y) => any
  cellToClone: any; // (cellToClone) => any;
  duplicateCells: any; // (any[]) => any[]

  // handlers
  tooltipHandler: any;
  graphHandler: any;
  connectionHandler: any;
  panningHandler: any;

  getModel() {
    return this.graph.getModel();
  }

  start: any = {
    point: null,
    event: null,
    state: null,
    handle: null,
    selected: false,
  };

  graphLink: LinkManager;
  placeholderManager: PlaceholderManager;
  customLinks: CustomLinks;
  tableChecker: TableChecker;
  vertexConnector: VertexConnecter;
  zoomer: Zoomer;
  graphInitializer: GraphContainerInitializer;
  valueConverter: ValueConverter;
  labelExtracter: LabelExtracter;
  cellFolder: CellFolder;
  layersDialog: LayersDialog;
  cellTooltip: CellTooltip;

  /**
   * Graph inherits from mxGraph
   */
  // mxUtils.extend(Graph, mxGraph);
  constructor(container, model, opts: GraphOpts) {
    this.container = container;
    this.model = model;
    this.graph = new mxGraph(container);
    this.cssTransformConfig = new GraphCssTransformConfig(this);
    this.graphLink = new LinkManager(this);
    this.placeholderManager = new PlaceholderManager(this);
    this.customLinks = new CustomLinks();
    this.tableChecker = new TableChecker(this);
    this.vertexConnector = new VertexConnecter(this);
    this.zoomer = new Zoomer(this);
    this.graphInitializer = new GraphContainerInitializer(this);
    this.valueConverter = new ValueConverter(this);
    this.labelExtracter = new LabelExtracter(this);
    this.cellFolder = new CellFolder(this);
    this.layersDialog = new LayersDialog(this);
    this.cellTooltip = new CellTooltip(this);

    this.initialize(opts);
  }

  initialize(opts) {
    const { renderHint, stylesheet, themes, standalone } = opts;
    const { container, model, graph } = this;
    new GraphInitializer(this).create(
      graph,
      container,
      model,
      renderHint,
      stylesheet,
      themes,
      standalone
    );
  }

  /**
   * Specifies if the touch UI should be used (cannot detect touch in FF so always on for Windows/Linux)
   */
  static touchStyle =
    mxClient.IS_TOUCH ||
    (mxClient.IS_FF && mxClient.IS_WIN) ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    window["urlParams"] == null ||
    urlParams["touch"] == "1";

  /**
   * Shortcut for capability check.
   */
  static fileSupport =
    window.File != null &&
    window.FileReader != null &&
    window.FileList != null &&
    (window["urlParams"] == null || urlParams["filesupport"] != "0");

  /**
   * Default size for line jumps.
   */
  static lineJumpsEnabled = true;

  /**
   * Default size for line jumps.
   */
  static defaultJumpSize = 6;

  /**
   * Minimum width for table columns.
   */
  static minTableColumnWidth = 20;

  /**
   * Minimum height for table rows.
   */
  static minTableRowHeight = 20;

  /**
   * Text for foreign object warning.
   */
  static foreignObjectWarningText = "Viewer does not support full SVG 1.1";

  /**
   * Link for foreign object warning.
   */
  static foreignObjectWarningLink =
    "https://desk.draw.io/support/solutions/articles/16000042487";

  /**
   * Helper function for creating SVG data URI.
   */
  static createSvgImage(w, h, data, coordWidth?, coordHeight?) {
    return SvgImage.create(w, h, data, coordWidth, coordHeight);
  }

  static zapGremlins(text) {
    return Zapper.zapGremlins(text);
  }

  isZoomWheelEvent(evt) {
    return WheelEvent.isZoomWheelEvent(evt);
  }

  isScrollWheelEvent(evt) {
    return WheelEvent.isScrollWheelEvent(evt);
  }

  /**
   * Allows all values in fit.
   */
  minFitScale = null;

  /**
   * Allows all values in fit.
   */
  maxFitScale = null;

  /**
   * Scrollbars are enabled on non-touch devices (not including Firefox because touch events
   * cannot be detected in Firefox, see above).
   */
  defaultScrollbars = !mxClient.IS_IOS;

  /**
   * Specifies if the app should run in chromeless mode. Default is false.
   * This default is only used if the contructor argument is null.
   */
  lightbox = false;

  /**
   * Specifies the size of the size for "tiles" to be used for a graph with
   * scrollbars but no visible background page. A good value is large
   * enough to reduce the number of repaints that is caused for auto-
   * translation, which depends on this value, and small enough to give
   * a small empty buffer around the graph. Default is 400x400.
   */
  scrollTileSize = new mxRectangle(0, 0, 400, 400);

  /**
   * Overrides the background color and paints a transparent background.
   */
  transparentBackground = true;

  /**
   * Sets global constants.
   */
  selectParentAfterDelete = false;

  /**
   * Sets the default target for all links in cells.
   */
  defaultEdgeLength = 80;

  /**
   * Disables move of bends/segments without selecting.
   */
  edgeMode = false;

  /**
   * Allows all values in fit.
   */
  connectionArrowsEnabled = true;

  /**
   * Specifies the default name for the theme. Default is 'default'.
   */
  defaultThemeName = "default";

  /**
   * Specifies the default name for the theme. Default is 'default'.
   */
  defaultThemes = {};

  /**
   * Specifies if the label should be edited after an insert.
   */
  editAfterInsert = false;

  /**
   * Defines if the graph is part of an EditorUi. If this is false the graph can
   * be used in an EditorUi instance but will not have a UI added, functions
   * overridden or event handlers added.
   */
  standalone = false;

  state: any;
  shape: any;

  /**
   * Installs child layout styles.
   */
  init(container) {
    this.graphInitializer.init(container);
  }

  cssTransformConfig: any;

  get isLightboxView() {
    return !!this.lightbox;
  }

  get isViewer() {
    return false;
  }

  /**
   * Sanitizes the given HTML markup.
   */
  sanitizeHtml(value, editing?) {
    return Sanitizer.sanitizeHtml(value, editing);
  }

  /**
   * Adds Alt+click to select cells behind cells (Shift+Click on Chrome OS).
   */
  isTransparentClickEvent(evt) {
    return (
      mxEvent.isAltDown(evt) ||
      (mxClient.IS_CHROMEOS && mxEvent.isShiftDown(evt))
    );
  }

  /**
   * Adds ctrl+shift+connect to disable connections.
   */
  isIgnoreTerminalEvent(evt) {
    return mxEvent.isShiftDown(evt) && mxEvent.isControlDown(evt);
  }

  /**
   * Adds support for placeholders in labels.
   */
  isSplitTarget(target, cells, evt) {
    return (
      !this.model.isEdge(cells[0]) &&
      !mxEvent.isAltDown(evt) &&
      !mxEvent.isShiftDown(evt) &&
      mxGraph.prototype.isSplitTarget.apply(this, [target, cells, evt])
    );
  }

  // DEPRECATED!?
  // /**
  //  * Adds labelMovable style.
  //  */
  // isLabelMovable(cell)
  // {
  // 	var style = this.getCurrentCellStyle(cell);

  // 	return !this.isCellLocked(cell) &&
  // 		((this.model.isEdge(cell) && this.edgeLabelsMovable) ||
  // 		(this.model.isVertex(cell) && (this.vertexLabelsMovable ||
  // 		mxUtils.getValue(style, 'labelMovable', '0') == '1')));
  // };

  /**
   * Adds event if grid size is changed.
   */
  setGridSize(value) {
    this.gridSize = value;
    this.fireEvent("gridSizeChanged");
  }

  fireEvent(_event) {
    // this.fireEvent(new mxEventObject('gridSizeChanged'));
  }

  /**
   * Function: getClickableLinkForCell
   *
   * Returns the first non-null link for the cell or its ancestors.
   *
   * Parameters:
   *
   * cell - <mxCell> whose link should be returned.
   */
  getClickableLinkForCell(cell) {
    do {
      var link = this.getLinkForCell(cell);

      if (link != null) {
        return link;
      }

      cell = this.model.getParent(cell);
    } while (cell != null);

    return null;
  }

  /**
   * Private helper method.
   */
  getGlobalVariable(name) {
    return GlobalVar.getGlobalVariable(name);
  }

  /**
   * Formats a date, see http://blog.stevenlevithan.com/archives/date-time-format
   */
  formatDate(date, mask, utc?) {
    return DateFormatter.formatDate(date, mask, utc);
  }

  /**
   *
   */
  createLayersDialog() {
    return this.layersDialog.create();
  }

  /**
   * Resolves the given cells in the model and selects them.
   */
  restoreSelection(cells) {
    if (cells != null && cells.length > 0) {
      var temp: any[] = [];

      for (var i = 0; i < cells.length; i++) {
        var newCell = this.model.getCell(cells[i].id);

        if (newCell != null) {
          temp.push(newCell);
        }
      }

      this.setSelectionCells(temp);
    } else {
      this.clearSelection();
    }
  }

  isReplacePlaceholders(cell) {
    return this.placeholderManager.isReplacePlaceholders(cell);
  }

  replacePlaceholders(cell, str) {
    return this.placeholderManager.replacePlaceholders(cell, str);
  }

  /**
   * Returns all labels in the diagram as a string.
   */
  getIndexableText() {
    return this.labelExtracter.getIndexableText();
  }

  /**
   * Returns the label for the given cell.
   */
  convertValueToString(cell) {
    return this.labelExtracter.convertValueToString(cell);
  }

  /**
   * Returns the link for the given cell.
   */
  getLinksForState(state) {
    if (state != null && state.text != null && state.text.node != null) {
      return state.text.node.getElementsByTagName("a");
    }

    return null;
  }

  /**
   * Returns the link for the given cell.
   */
  getLinkForCell(cell) {
    if (cell.value != null && typeof cell.value == "object") {
      var link = cell.value.getAttribute("link");

      // Removes links with leading javascript: protocol
      // TODO: Check more possible attack vectors
      if (
        link != null &&
        link.toLowerCase().substring(0, 11) === "javascript:"
      ) {
        link = link.substring(11);
      }

      return link;
    }

    return null;
  }

  /**
   * Overrides label orientation for collapsed swimlanes inside stack.
   */
  getCellStyle(cell) {
    var style = mxGraph.prototype.getCellStyle.apply(this, [cell]);

    if (cell != null && this.layoutManager != null) {
      var parent = this.model.getParent(cell);

      if (this.model.isVertex(parent) && this.isCellCollapsed(cell)) {
        var layout = this.layoutManager.getLayout(parent);

        if (layout != null && layout.constructor == mxStackLayout) {
          style[mxConstants.STYLE_HORIZONTAL] = !layout.horizontal;
        }
      }
    }

    return style;
  }

  /**
   * Disables alternate width persistence for stack layout parents
   */
  updateAlternateBounds(cell, geo, willCollapse) {
    if (
      cell != null &&
      geo != null &&
      this.layoutManager != null &&
      geo.alternateBounds != null
    ) {
      var layout = this.layoutManager.getLayout(this.model.getParent(cell));

      if (layout != null && layout.constructor == mxStackLayout) {
        if (layout.horizontal) {
          geo.alternateBounds.height = 0;
        } else {
          geo.alternateBounds.width = 0;
        }
      }
    }

    mxGraph.prototype.updateAlternateBounds.apply(this, [
      cell,
      geo,
      willCollapse,
    ]);
  }

  /**
   * Adds Shift+collapse/expand and size management for folding inside stack
   */
  foldCells(collapse, recurse, cells, checkFoldable, evt) {
    return this.cellFolder.foldCells(
      collapse,
      recurse,
      cells,
      checkFoldable,
      evt
    );
  }

  /**
   * Disables drill-down for non-swimlanes.
   */
  isContainer(cell) {
    var style = this.getCurrentCellStyle(cell);

    if (this.isSwimlane(cell)) {
      return style["container"] != "0";
    } else {
      return style["container"] == "1";
    }
  }

  /**
   * Adds a expand style.
   */
  isExtendParent(cell) {
    var parent = this.model.getParent(cell);

    if (parent != null) {
      var style = this.getCurrentCellStyle(parent);

      if (style["expand"] != null) {
        return style["expand"] != "0";
      }
    }

    return mxGraph.prototype.isExtendParent.apply(this, [cell]);
  }

  /**
   * Adds labelMovable style.
   */
  isLabelMovable(cell) {
    var style = this.getCurrentCellStyle(cell);

    return style["movableLabel"] != null
      ? style["movableLabel"] != "0"
      : mxGraph.prototype.isLabelMovable.apply(this, [cell]);
  }

  /**
   * Function: selectAll
   *
   * Selects all children of the given parent cell or the children of the
   * default parent if no parent is specified. To select leaf vertices and/or
   * edges use <selectCells>.
   *
   * Parameters:
   *
   * parent - Optional <mxCell> whose children should be selected.
   * Default is <defaultParent>.
   */
  selectAll(parent) {
    parent = parent || this.getDefaultParent();

    if (!this.isCellLocked(parent)) {
      mxGraph.prototype.selectAll.apply(this, [parent]);
    }
  }

  /**
   * Function: selectCells
   *
   * Selects all vertices and/or edges depending on the given boolean
   * arguments recursively, starting at the given parent or the default
   * parent if no parent is specified. Use <selectAll> to select all cells.
   * For vertices, only cells with no children are selected.
   *
   * Parameters:
   *
   * vertices - Boolean indicating if vertices should be selected.
   * edges - Boolean indicating if edges should be selected.
   * parent - Optional <mxCell> that acts as the root of the recursion.
   * Default is <defaultParent>.
   */
  selectCells(vertices, edges, parent) {
    parent = parent || this.getDefaultParent();

    if (!this.isCellLocked(parent)) {
      mxGraph.prototype.selectCells.apply(this, [vertices, edges, parent]);
    }
  }

  /**
   * Function: getSwimlaneAt
   *
   * Returns the bottom-most swimlane that intersects the given point (x, y)
   * in the cell hierarchy that starts at the given parent.
   *
   * Parameters:
   *
   * x - X-coordinate of the location to be checked.
   * y - Y-coordinate of the location to be checked.
   * parent - <mxCell> that should be used as the root of the recursion.
   * Default is <defaultParent>.
   */
  getSwimlaneAt(x, y, parent) {
    var result = mxGraph.prototype.getSwimlaneAt.apply(this, [x, y, parent]);

    if (this.isCellLocked(result)) {
      result = null;
    }

    return result;
  }

  // TODO: move to custom links?
  isCustomLink(href) {
    return this.graphLink.isCustomLink(href);
  }

  /**
   * Stops all interactions and clears the selection.
   */
  reset() {
    if (this.isEditing()) {
      this.stopEditing(true);
    }

    this.escape();

    if (!this.isSelectionEmpty()) {
      this.clearSelection();
    }
  }

  /**
   * Overrides tooltips to show custom tooltip or metadata.
   */
  getTooltipForCell(cell) {
    return this.cellTooltip.getTooltipForCell(cell);
  }

  zoom(factor, center?) {
    this.zoomer.zoom(factor, center);
  }

  zoomIn() {
    this.zoomer.zoomIn();
  }

  zoomOut() {
    this.zoomer.zoomOut();
  }

  /**
   * Turns the given string into an array.
   */
  stringToBytes(str) {
    return StringBytesConverter.stringToBytes(str);
  }

  /**
   * Turns the given array into a string.
   */
  bytesToString(arr) {
    return StringBytesConverter.bytesToString(arr);
  }

  /**
   * Returns a base64 encoded version of the compressed outer XML of the given node.
   */
  compressNode(node) {
    return Compresser.compressNode(node, null);
  }

  /**
   * Returns a base64 encoded version of the compressed string.
   */
  compress(data, deflate) {
    return Compresser.compress(data, deflate);
  }

  static decompress(data, inflate, checked) {
    return Compresser.decompress(data, inflate, checked);
  }

  /**
   * Returns a decompressed version of the base64 encoded string.
   */
  decompress(data, inflate) {
    return Graph.decompress(data, inflate, null);
  }

  /**
   * Redirects to static zapGremlins.
   */
  zapGremlins(text) {
    return Zapper.zapGremlins(text);
  }

  createParent(parent, child, childCount) {
    parent = this.cloneCell(parent);

    for (var i = 0; i < childCount; i++) {
      parent.insert(this.cloneCell(child));
    }

    return parent;
  }

  /**
   *
   */
  createCrossFunctionalSwimlane(rowCount, colCount, w, h) {
    w = w != null ? w : 120;
    h = h != null ? h : 120;

    var s =
      "swimlane;html=1;whiteSpace=wrap;container=1;" +
      "collapsible=0;recursiveResize=0;expand=0;";

    var table = this.createVertex(
      null,
      null,
      "",
      0,
      0,
      colCount * w,
      rowCount * h,
      s + "childLayout=tableLayout;"
    );
    var row = this.createVertex(
      null,
      null,
      "",
      0,
      0,
      colCount * w,
      h,
      s + "horizontal=0;points=[[0,0.5],[1,0.5]];part=1;"
    );
    table.insert(
      this.createParent(
        row,
        this.createVertex(
          null,
          null,
          "",
          0,
          0,
          w,
          h,
          s + "connectable=0;part=1;"
        ),
        colCount
      )
    );

    if (rowCount > 1) {
      return this.createParent(
        table,
        this.createParent(
          row,
          this.createVertex(
            null,
            null,
            "",
            0,
            0,
            w,
            h,
            s + "connectable=0;part=1;startSize=0;"
          ),
          colCount
        ),
        rowCount - 1
      );
    } else {
      return table;
    }
  }

  /**
   * Updates column width and row height.
   */
  getActualStartSize(swimlane, ignoreState?) {
    var result = new mxRectangle();

    if (this.isSwimlane(swimlane)) {
      var style = this.getCurrentCellStyle(swimlane, ignoreState);
      var size = parseInt(
        mxUtils.getValue(
          style,
          mxConstants.STYLE_STARTSIZE,
          mxConstants.DEFAULT_STARTSIZE
        )
      );
      var flipH = mxUtils.getValue(style, mxConstants.STYLE_FLIPH, 0) == 1;
      var flipV = mxUtils.getValue(style, mxConstants.STYLE_FLIPV, 0) == 1;
      var h = mxUtils.getValue(style, mxConstants.STYLE_HORIZONTAL, true);
      var n = 0;

      if (!h) {
        n++;
      }

      var dir = mxUtils.getValue(
        style,
        mxConstants.STYLE_DIRECTION,
        mxConstants.DIRECTION_EAST
      );

      if (dir == mxConstants.DIRECTION_NORTH) {
        n++;
      } else if (dir == mxConstants.DIRECTION_WEST) {
        n += 2;
      } else if (dir == mxConstants.DIRECTION_SOUTH) {
        n += 3;
      }

      n = mxUtils.mod(n, 4);

      if (n == 0) {
        result.y = size;
      } else if (n == 1) {
        result.x = size;
      } else if (n == 2) {
        result.height = size;
      } else if (n == 3) {
        result.width = size;
      }

      if (flipV) {
        var tmp = result.y;
        result.y = result.height;
        result.height = tmp;
      }

      if (flipH) {
        var tmp = result.x;
        result.x = result.width;
        result.width = tmp;
      }
    }

    return result;
  }

  /**
   * Creates lookup from object IDs to cell IDs.
   */
  createCellLookup(cells, lookup) {
    lookup = lookup != null ? lookup : new Object();

    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      lookup[mxObjectIdentity.get(cell)] = cell.getId();
      var childCount = this.model.getChildCount(cell);

      for (var j = 0; j < childCount; j++) {
        this.createCellLookup([this.model.getChildAt(cell, j)], lookup);
      }
    }

    return lookup;
  }

  /**
   * Creates lookup from original to cloned cell IDs where mapping is
   * the mapping used in cloneCells and lookup is a mapping from
   * object IDs to cell IDs.
   */
  createCellMapping(mapping, lookup, cellMapping) {
    cellMapping = cellMapping != null ? cellMapping : new Object();

    for (var objectId in mapping) {
      var cellId = lookup[objectId];

      if (cellMapping[cellId] == null) {
        // Uses empty string if clone ID was null which means
        // the cell was cloned but not inserted into the model.
        cellMapping[cellId] = mapping[objectId].getId() || "";
      }
    }

    return cellMapping;
  }

  /**
   * Translates this point by the given vector.
   *
   * @param {number} dx X-coordinate of the translation.
   * @param {number} dy Y-coordinate of the translation.
   */
  encodeCells(cells) {
    var cloneMap = new Object();
    var clones = this.cloneCells(cells, null, cloneMap);

    // Creates a dictionary for fast lookups
    var dict = new mxDictionary();

    for (var i = 0; i < cells.length; i++) {
      dict.put(cells[i], true);
    }

    // Checks for orphaned relative children and makes absolute
    for (var i = 0; i < clones.length; i++) {
      var state = this.view.getState(cells[i]);

      if (state != null) {
        var geo = this.getCellGeometry(clones[i]);

        if (
          geo != null &&
          geo.relative &&
          !this.model.isEdge(cells[i]) &&
          !dict.get(this.model.getParent(cells[i]))
        ) {
          geo.relative = false;
          geo.x = state.x / state.view.scale - state.view.translate.x;
          geo.y = state.y / state.view.scale - state.view.translate.y;
        }
      }
    }

    var codec = new mxCodec();
    var model = new mxGraphModel();
    var parent = model.getChildAt(model.getRoot(), 0);

    for (var i = 0; i < clones.length; i++) {
      model.add(parent, clones[i]);
    }
    const cellMapping = this.createCellMapping(
      cloneMap,
      this.createCellLookup(cells, null),
      null
    );
    this.updateCustomLinks(cellMapping, clones);

    return codec.encode(model);
  }

  updateCustomLinks(cellMapping, clones) {
    this.customLinks.updateCustomLinks(cellMapping, clones);
  }

  /**
   * Overrides cloning cells in moveCells.
   */

  moveCells(cells, dx, dy, clone, target, evt, mapping) {
    var graphMoveCells = Graph.prototype.moveCells;
    mapping = mapping != null ? mapping : new Object();
    var result = graphMoveCells.apply(this, [
      cells,
      dx,
      dy,
      clone,
      target,
      evt,
      mapping,
    ]);

    if (clone) {
      const cellMapping = this.createCellMapping(
        mapping,
        this.createCellLookup(cells, null),
        null
      );
      this.updateCustomLinks(cellMapping, result);
    }
    return result;
  }

  /**
   * Overrides method to provide connection constraints for shapes.
   */
  getAllConnectionConstraints(terminal, _source) {
    if (terminal != null) {
      var constraints = mxUtils.getValue(terminal.style, "points", null);

      if (constraints != null) {
        // Requires an array of arrays with x, y (0..1), an optional
        // [perimeter (0 or 1), dx, and dy] eg. points=[[0,0,1,-10,10],[0,1,0],[1,1]]
        var result: any[] = [];

        try {
          var c = JSON.parse(constraints);

          for (var i = 0; i < c.length; i++) {
            var tmp = c[i];
            result.push(
              new mxConnectionConstraint(
                new mxPoint(tmp[0], tmp[1]),
                tmp.length > 2 ? tmp[2] != "0" : true,
                undefined,
                tmp.length > 3 ? tmp[3] : 0,
                tmp.length > 4 ? tmp[4] : 0
              )
            );
          }
        } catch (e) {
          // ignore
        }

        return result;
      } else if (terminal.shape != null && terminal.shape.bounds != null) {
        var dir = terminal.shape.direction;
        var bounds = terminal.shape.bounds;
        var scale = terminal.shape.scale;
        var w = bounds.width / scale;
        var h = bounds.height / scale;

        if (
          dir == mxConstants.DIRECTION_NORTH ||
          dir == mxConstants.DIRECTION_SOUTH
        ) {
          tmp = w;
          w = h;
          h = tmp;
        }

        constraints = terminal.shape.getConstraints(terminal.style, w, h);

        if (constraints != null) {
          return constraints;
        } else if (
          terminal.shape.stencil != null &&
          terminal.shape.stencil.constraints != null
        ) {
          return terminal.shape.stencil.constraints;
        } else if (terminal.shape.constraints != null) {
          return terminal.shape.constraints;
        }
      }
    }

    return null;
  }

  /**
   * Inverts the elbow edge style without removing existing styles.
   */
  flipEdge(edge) {
    if (edge != null) {
      var style = this.getCurrentCellStyle(edge);
      var elbow = mxUtils.getValue(
        style,
        mxConstants.STYLE_ELBOW,
        mxConstants.ELBOW_HORIZONTAL
      );
      var value =
        elbow == mxConstants.ELBOW_HORIZONTAL
          ? mxConstants.ELBOW_VERTICAL
          : mxConstants.ELBOW_HORIZONTAL;
      this.setCellStyles(mxConstants.STYLE_ELBOW, value, [edge]);
    }
  }

  /**
   * Disables drill-down for non-swimlanes.
   */
  isValidRoot(cell) {
    // Counts non-relative children
    var childCount = this.model.getChildCount(cell);
    var realChildCount = 0;

    for (var i = 0; i < childCount; i++) {
      var child = this.model.getChildAt(cell, i);

      if (this.model.isVertex(child)) {
        var geometry = this.getCellGeometry(child);

        if (geometry != null && !geometry.relative) {
          realChildCount++;
        }
      }
    }

    return realChildCount > 0 || this.isContainer(cell);
  }

  /**
   * Disables drill-down for non-swimlanes.
   */
  isValidDropTarget(cell) {
    var style = this.getCurrentCellStyle(cell);

    return (
      (mxUtils.getValue(style, "part", "0") != "1" || this.isContainer(cell)) &&
      mxUtils.getValue(style, "dropTarget", "1") != "0" &&
      (mxGraph.prototype.isValidDropTarget.apply(this, [cell, null, null]) ||
        this.isContainer(cell))
    );
  }

  /**
   * Overrides createGroupCell to set the group style for new groups to 'group'.
   */
  createGroupCell() {
    var group = mxGraph.prototype.createGroupCell.apply(this, [undefined]);
    group.setStyle("group");
    return group;
  }

  /**
   * Disables extending parents with stack layouts on add
   */
  isExtendParentsOnAdd(cell) {
    var result = mxGraph.prototype.isExtendParentsOnAdd.apply(this, [cell]);

    if (result && cell != null && this.layoutManager != null) {
      var parent = this.model.getParent(cell);

      if (parent != null) {
        var layout = this.layoutManager.getLayout(parent);

        if (layout != null && layout.constructor == mxStackLayout) {
          result = false;
        }
      }
    }

    return result;
  }

  /**
   * Overrides autosize to add a border.
   */
  getPreferredSizeForCell(cell) {
    const proto = mxGraph.prototype;
    var result = mxGraph.prototype.getPreferredSizeForCell.apply(this, [cell]);

    // Adds buffer
    if (result != null) {
      result.width += 10;
      result.height += 4;

      if (proto.gridEnabled) {
        result.width = proto.snap(result.width);
        result.height = proto.snap(result.height);
      }
    }

    return result;
  }

  /**
   * Overridden to stop moving edge labels between cells.
   */
  getDropTarget(cells, evt, cell, clone) {
    // var model = this.getModel();

    // Disables drop into group if alt is pressed
    if (mxEvent.isAltDown(evt)) {
      return null;
    }

    // Disables dragging edge labels out of edges
    for (var i = 0; i < cells.length; i++) {
      if (this.model.isEdge(this.model.getParent(cells[i]))) {
        return null;
      }
    }

    return mxGraph.prototype.getDropTarget.apply(this, [
      cells,
      evt,
      cell,
      clone,
    ]);
  }

  /**
   * Adds a new label at the given position and returns the new cell. State is
   * an optional edge state to be used as the parent for the label. Vertices
   * are not allowed currently as states.
   */
  addText(x, y, state) {
    // Creates a new edge label with a predefined text
    var label = new mxCell();
    label.value = "Text";
    label.style =
      "text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];";
    label.geometry = new mxGeometry(0, 0, 0, 0);
    label.vertex = true;

    if (state != null && this.model.isEdge(state.cell)) {
      label.style += "labelBackgroundColor=#ffffff;";
      label.geometry.relative = true;
      label.connectable = false;

      // Resets the relative location stored inside the geometry
      var pt2 = this.view.getRelativePoint(state, x, y);
      label.geometry.x = Math.round(pt2.x * 10000) / 10000;
      label.geometry.y = Math.round(pt2.y);

      // Resets the offset inside the geometry to find the offset from the resulting point
      label.geometry.offset = new mxPoint(0, 0);
      pt2 = this.view.getPoint(state, label.geometry);

      var scale = this.view.scale;
      label.geometry.offset = new mxPoint(
        Math.round((x - pt2.x) / scale),
        Math.round((y - pt2.y) / scale)
      );
    } else {
      var tr = this.view.translate;
      label.geometry.width = 40;
      label.geometry.height = 20;
      label.geometry.x =
        Math.round(x / this.view.scale) -
        tr.x -
        (state != null ? state.origin.x : 0);
      label.geometry.y =
        Math.round(y / this.view.scale) -
        tr.y -
        (state != null ? state.origin.y : 0);
      label.style += "autosize=1;";
    }

    this.getModel().beginUpdate();
    try {
      this.addCells([label], state != null ? state.cell : null);
      this.fireEvent(new mxEventObject("textInserted", "cells", [label]));

      // Updates size of text after possible change of style via event
      this.autoSizeCell(label);
    } finally {
      this.getModel().endUpdate();
    }

    return label;
  }

  /**
   * Inserts the given image at the cursor in a content editable text box using
   * the insertimage command on the document instance.
   */
  insertImage(newValue, w, h) {
    // To find the new image, we create a list of all existing links first
    if (newValue != null && this.cellEditor.textarea != null) {
      var tmp = this.cellEditor.textarea.getElementsByTagName("img");
      var oldImages: any[] = [];

      for (var i = 0; i < tmp.length; i++) {
        oldImages.push(tmp[i]);
      }

      // LATER: Fix inserting link/image in IE8/quirks after focus lost
      document.execCommand("insertimage", false, newValue);

      // Sets size of new image
      var newImages = this.cellEditor.textarea.getElementsByTagName("img");

      if (newImages.length == oldImages.length + 1) {
        // Inverse order in favor of appended images
        for (var i = newImages.length - 1; i >= 0; i--) {
          if (i == 0 || newImages[i] != oldImages[i - 1]) {
            // Workaround for lost styles during undo and redo is using attributes
            newImages[i].setAttribute("width", w);
            newImages[i].setAttribute("height", h);
            break;
          }
        }
      }
    }
  }

  /**
   * Adds meta-drag an Mac.
   * @param evt
   * @returns
   */
  isCloneEvent(evt) {
    return (
      (mxClient.IS_MAC && mxEvent.isMetaDown(evt)) || mxEvent.isControlDown(evt)
    );
  }
}
