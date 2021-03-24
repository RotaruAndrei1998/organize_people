import { useContext } from "react";
import { DragAndDropContext } from "../context";

const useDraggedItem = () => {
  const dragAndDropContext = useContext(DragAndDropContext);

  return [dragAndDropContext];
};

export default useDraggedItem;
