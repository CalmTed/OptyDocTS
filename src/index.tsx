import React from "react";
import { createRoot } from "react-dom/client";

import Page from "./components/Page";
import store from "./store";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<Page state={store.getState()} dispach={store.dispach} />);
store.subscribe((state) => {
  root.render(<Page state={state} dispach={store.dispach} />);
});