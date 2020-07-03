import { Click } from "../Click";
import { MouseDown } from "./MouseDown";
import { MouseUp } from "./MouseUp";
import { MouseMove } from "./MouseMove";
import { Activate } from "./Activate";
import { Clear } from "./Clear";
import { CurrentState } from "./CurrentState";

export class MouseListener extends Click {
  beforeClick: any;
  onClick: any;

  cursor = this.container.style.cursor;
  tol = this.getTolerance();

  mouseDown: any;
  mouseMove: any;
  mouseUp: any;
  activate: any;
  clear: any;
  updateCurrentState: any;

  init() {
    const { graph } = this;
    this.mouseDown = new MouseDown(graph).handler;
    this.mouseMove = new MouseMove(graph).handler;
    this.mouseUp = new MouseUp(graph).handler;
    this.activate = new Activate(graph).handler;
    this.clear = new Clear(graph).handler;
    this.updateCurrentState = new CurrentState(graph).update;
  }

  createHandler() {
    const { highlight, updateCurrentState } = this;

    const { mouseDown, mouseMove, mouseUp, activate, clear } = this;

    return {
      currentState: null,
      currentLink: null,
      highlight,
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
      updateCurrentState,
      mouseDown,
      mouseMove,
      mouseUp,
      activate,
      clear,
    };
  }
}
