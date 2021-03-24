import { prop } from "ramda";
import {
  handleDragStart,
  handleDragEnd,
  handleDrop,
  handleDragOver,
} from "./handleEvents";
import { useDraggedItem, useModal } from "../../hooks";

const Group = ({ group, children, handleReload }) => {

  const { name, generalId } = group;  
  const [draggedItem] = useDraggedItem();
  const [, dispatchModalState] = useModal();

  const handleOnClick = (e) => {
    e.stopPropagation();
    dispatchModalState({ type: "EDIT", payload: group });
  };
  return (
    <div
      className="group"
      key={prop("generalId", group)}
      onDragStart={(e) => handleDragStart(draggedItem)(e, group)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDrop={(e) => handleDrop(draggedItem, handleReload)(e, group)}
      onDragOver={(e) => handleDragOver(e)}
      onClick={(e) => handleOnClick(e)}
      draggable
    >
      <div>
        <span className="group__title">{name} {generalId}</span>
      </div>
      {children}
    </div>
  );
};

export default Group;
