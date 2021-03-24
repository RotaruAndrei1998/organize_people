import { useReducer } from "react";
import DashboardPage from "./pages/dashboard-page";
import { ModalContext } from "./context";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const modalReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { item: null, isShow: true };

    case "EDIT":
      return { item: action.payload, isShow: true };

    case "CLOSE":
      return { item: null, isShow: false };
    default:
      return { item: null, isShow: false };
  }
};

const App = () => {
  const [modalState, dispatchModalState] = useReducer(modalReducer, {
    item: null,
    isShow: false,
  });

  return (
    <ModalContext.Provider value={{ modalState, dispatchModalState }}>
      <DashboardPage />
    </ModalContext.Provider>
  );
};

export default App;
