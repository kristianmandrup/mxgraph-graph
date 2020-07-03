// setUpdatePageBreaks() {
//   var graphUpdatePageBreaks = mxGraph.prototype.updatePageBreaks;

//   mxGraph.prototype.updatePageBreaks = (visible, width, height) => {
//     var useCssTranforms = this.useCssTransforms,
//       scale = this.view.scale,
//       translate = this.view.translate;

//     if (useCssTranforms) {
//       this.view.scale = 1;
//       this.view.translate = new mxPoint(0, 0);
//       this.useCssTransforms = false;
//     }

//     graphUpdatePageBreaks.apply(this, [visible, width, height]);

//     if (useCssTranforms) {
//       this.view.scale = scale;
//       this.view.translate = translate;
//       this.useCssTransforms = true;
//     }
//   };
// }
