import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import ModalItem from "../components/modal-item/modal-item";
import { useModal } from "../hooks";
import { getTree } from "../services/tree";
import DragAndDropTree from "../components/drag-and-drop-tree.js";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [, dispatchModalState] = useModal();

  const handleReload = () => setReload(!reload);

  useEffect(() => {
    getTree().then((data) => setData(data));
  }, [reload]);

  return (
    <div>
      <Button onClick={() => dispatchModalState({ type: "ADD" })}>Add</Button>
      <DragAndDropTree data={data} handleReload={handleReload} />
      <ModalItem handleReload={handleReload} />
    </div>
  );
};

export default DashboardPage;
