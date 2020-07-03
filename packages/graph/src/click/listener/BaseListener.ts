import { BaseEventer } from "../BaseEventer";
import { Clear } from "./Clear";
import { Activate } from "./Activate";

export class BaseListener extends BaseEventer {
  cursor: any;
  ctx: any;
  updateCurrentState: any;

  clear: any;
  activate: any;

  constructor(graph: any) {
    super(graph);
    this.clear = new Clear(graph).handler;
    this.activate = new Activate(graph).handler;
  }
}
