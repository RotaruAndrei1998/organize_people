import React, { useRef } from "react";
import { DragAndDropContext } from "../../context";
import renderTreeElement from "./render-tree-element";
import { handleDrop, handleDragOver } from "./handleEvents";

import "./drag-and-drop-tree.css";

const DragAndDropTree = ({ data, handleReload }) => {
  const draggedItem = useRef(null);

  return (
    <DragAndDropContext.Provider value={draggedItem}>
      <div
        className="dragAndDrop__container"
        onDrop={(e) => handleDrop(draggedItem, handleReload)(e, "root")}
        onDragOver={(e) => handleDragOver(e)}
      >
        {renderTreeElement(handleReload)(data)}
      </div>
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropTree;
