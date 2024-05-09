import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const user = {
  user: "Adam",
  email: "fsdagda@bdfshd.com",
  onClick: () => {},
};

const root = createRoot(document.getElementById("root"));
root.render(<App value={user} />);
