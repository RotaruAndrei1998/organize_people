import { propEq, prop, any } from "ramda";

const isItOrIn = (idDropped) => (item) => {
  if (propEq("generalId", idDropped)(item)) return true;

  if (prop("content", item)) {
    return any(isItOrIn(idDropped))(prop("content", item));
  }

  return false;
};

export default isItOrIn;
