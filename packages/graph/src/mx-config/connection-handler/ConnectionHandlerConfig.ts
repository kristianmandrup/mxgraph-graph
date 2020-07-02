import mx from "@mxgraph-app/mx";
const { mxConnectionHandler } = mx;

export class CellHighlightConfig {
  config() {
    // Disables connection points
    const { constraintHandler, graph } = mxConnectionHandler.prototype;
    var connectionHandlerInit = mxConnectionHandler.prototype.init;
    mxConnectionHandler.prototype.init = (...args) => {
      connectionHandlerInit.apply(this, [...args]);

      constraintHandler.isEnabled = () => {
        return graph.connectionHandler.isEnabled();
      };
    };

    mxConnectionHandler.prototype.outlineConnect = true;
    return mxConnectionHandler;
  }
}
