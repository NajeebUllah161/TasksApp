import Main from "./main/Main.js";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store.js";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
