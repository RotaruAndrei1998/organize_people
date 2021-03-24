import { useContext } from "react";
import { ModalContext } from "../context";

const useModal = () => {
  const { modalState, dispatchModalState } = useContext(ModalContext);

  return [modalState, dispatchModalState];
};

export default useModal;
