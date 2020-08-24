import * as createDes from "./createDes";
import * as deleteDes from "./deleteDes";
import * as getAllDes from "./getAllDes";
import * as editDes from "./editDes";

export default {
  ...getAllDes,
  ...createDes,
  ...editDes,
  ...deleteDes,
};
