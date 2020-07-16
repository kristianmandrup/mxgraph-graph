export class CustomLinks {
  /**
   * Updates cells IDs for custom links in the given cells.
   */
  updateCustomLinks(mapping, cells) {
    for (var i = 0; i < cells.length; i++) {
      if (cells[i] != null) {
        this.updateCustomLinksForCell(mapping, cells[i]);
      }
    }
  }

  /**
   * Updates cell IDs in custom links on the given cell and its label.
   */
  updateCustomLinksForCell(_mapping, _cell) {
    // Hook for subclassers
  }
}
