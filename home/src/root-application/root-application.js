import { start, registerApplication } from "single-spa";

const hashPrefix = (prefix) => (location) =>
  location.hash.startsWith(`#${prefix}`);

registerApplication(
  "react",
  () => import("../react/index.js"),
  hashPrefix("/")
);

registerApplication(
  "react_app",
  () => import("react_app/App"),
  hashPrefix("/")
);

registerApplication(
  "angular",
  () => import("../angular/index.js"),
  hashPrefix("/")
);

registerApplication(
  "angular_app",
  () => import("angular_app/App"),
  hashPrefix("/")
);

start();
