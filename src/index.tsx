import React from "react";
import { createRoot } from "react-dom/client";

import Page from "./components/Page";
import stateManager from "./store";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<Page state={stateManager.getState()} dispach={stateManager.dispach} />);
stateManager.subscribe((state) => {
  root.render(<Page state={state} dispach={stateManager.dispach} />);
});