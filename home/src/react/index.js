import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

import Root from "./root.component.js";

const domElementGetter = () => {
  const id = "react-app-local";
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }

  return el;
};

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter,
});

export const bootstrap = (props) => reactLifecycles.bootstrap(props);
export const mount = (props) => reactLifecycles.mount(props);
export const unmount = (props) => reactLifecycles.unmount(props);
