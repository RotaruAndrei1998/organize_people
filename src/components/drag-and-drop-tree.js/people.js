import { prop } from "ramda";
import {
  handleDragStart,
  handleDragEnd,
  handleDrop,
  handleDragOver,
} from "./handleEvents";
import { useDraggedItem, useModal } from "../../hooks";

const People = ({ people, handleReload }) => {

    const {firstName, lastName, jobTitle, generalId} = people;

  const [draggedItem] = useDraggedItem();
  const [, dispatchModalState] = useModal();

  const handleOnClick = (e) => {
    e.stopPropagation();
    dispatchModalState({ type: "EDIT", payload: people });
  };

  return (
    <div className="people"
      key={prop("generalId", people)}
      onDragStart={(e) => handleDragStart(draggedItem)(e, people)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDrop={(e) => handleDrop(draggedItem, handleReload)(e, people)}
      onDragOver={(e) => handleDragOver(e)}
      onClick={(e) => handleOnClick(e)}
      draggable
    >
      <span className="people__title">{firstName} {lastName} {jobTitle} {generalId}</span>
    </div>
  );
};

export default People;
