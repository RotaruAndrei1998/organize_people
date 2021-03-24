import { equals, pipe, prop, always, ifElse } from "ramda";
import isItOrIn from "../../utils/is-it-or-in";
import { updateTreeElement } from "../../services/tree";

export const handleDragEnd = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export const handleDragStart = (draggedItem) => (e, elem) => {
  e.stopPropagation();
  draggedItem.current = elem;
};

export const handleDrop = (draggedItem, handleReload) => (
  e,
  droppedZoneElem
) => {
  e.preventDefault();
  e.stopPropagation();

  if (equals("root", droppedZoneElem)) {
    updateTreeElement({
      ...prop("current", draggedItem),
      parentId: null,
    }).then(() => handleReload());
  }

  const setParentId = ifElse(
    prop("content"),
    prop("generalId"),
    prop("parentId")
  );

  ifElse(
    pipe(prop("current"), isItOrIn(prop("generalId", droppedZoneElem))),
    always(""),
    () =>
      updateTreeElement({
        ...prop("current", draggedItem),
        parentId: setParentId(droppedZoneElem),
      }).then(() => handleReload())
  )(draggedItem);
};
