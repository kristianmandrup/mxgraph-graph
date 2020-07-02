import mx from "@mxgraph-app/mx";
const { mxGraphModel, mxCodec } = mx;

export class Importer {
  cloneCell: any;
  isCloneInvalidEdges: any;
  createCellLookup: any;
  isCellLocked: any;
  getDefaultParent: any;
  model: any;
  moveCells: any;
  createCellMapping: any;
  updateCustomLinks: any;
  isGridEnabled: any;
  snap: any;
  getBoundingBoxFromGeometry: any;

  tempModel: any;
  cloneMap = {};
  cellMapping = {};

  node: any;
  dx: number;
  dy: number;
  crop: boolean;

  constructor(node, dx, dy, crop) {
    dx = dx != null ? dx : 0;
    dy = dy != null ? dy : 0;

    this.node = node;
    this.dx = dx;
    this.dy = dy;
    this.crop = crop;
    this.tempModel = this.createGraphModel();
  }

  createGraphModel() {
    return new mxGraphModel();
  }

  createCodec(node) {
    return new mxCodec(node.ownerDocument);
  }

  get layers() {
    const { tempModel, cloneMap } = this;
    const children = this.cloneCell(
      tempModel.root,
      this.isCloneInvalidEdges(),
      cloneMap
    );
    return tempModel.getChildren(children);
  }

  /**
   *
   */
  importGraphModel() {
    const { tempModel, layers, node } = this;
    const codec = this.createCodec(node);
    codec.decode(node, tempModel);
    var cells = [];
    // Clones cells to remove invalid edges
    this.importLayers(layers);
    return cells;
  }

  get lookup() {
    const { tempModel } = this;
    return this.createCellLookup([tempModel.root]);
  }

  importLayers(layers) {
    if (!layers) return;

    // Creates lookup from object IDs to cell IDs

    // Uses copy as layers are removed from array inside loop
    layers = layers.slice();

    this.model.beginUpdate();
    try {
      this.mergeLayers();
      this.mapClonedEntries();
    } finally {
      this.model.endUpdate();
    }
  }

  mapClonedEntries() {
    const { cloneMap, lookup, crop, cellMapping } = this;

    if (!cells) return;
    // Adds mapping for all cloned entries from imported to local cell ID
    this.createCellMapping(cloneMap, lookup, cellMapping);
    this.updateCustomLinks(cellMapping, cells);

    let { dx, dy } = this;
    if (crop) {
      if (this.isGridEnabled()) {
        dx = this.snap(dx);
        dy = this.snap(dy);
      }

      var bounds = this.getBoundingBoxFromGeometry(cells, true);

      if (bounds != null) {
        this.moveCells(cells, dx - bounds.x, dy - bounds.y);
      }
    }
  }

  mergeLayers() {
    const { tempModel, layers, cellMapping } = this;
    // Merges into unlocked current layer if one layer is pasted
    if (layers.length == 1 && !this.isCellLocked(this.getDefaultParent())) {
      cells = this.moveCells(
        tempModel.getChildren(layers[0]),
        dx,
        dy,
        false,
        this.getDefaultParent()
      );

      // Imported default parent maps to local default parent
      cellMapping[
        tempModel.getChildAt(tempModel.root, 0).getId()
      ] = this.getDefaultParent().getId();
    } else {
      for (var i = 0; i < layers.length; i++) {
        var children = this.model.getChildren(
          this.moveCells([layers[i]], dx, dy, false, this.model.getRoot())[0]
        );

        if (children != null) {
          cells = cells.concat(children);
        }
      }
    }
  }
}
