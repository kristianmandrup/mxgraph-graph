// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";
import { HoverIcons } from "../../hover";

const proto = HoverIcons.prototype;

// TODO: move to sidebar module
export const Sidebar = Class.extend({
  triangleUp: proto.triangleUp,
  triangleRight: proto.triangleRight,
  triangleDown: proto.triangleDown,
  triangleLeft: proto.triangleLeft,
  refreshTarget: proto.refreshTarget,
  roundDrop: proto.roundDrop,
});
