import "zone.js";
import { bootstrapApplication } from "@angular/platform-browser";
import { NgZone } from "@angular/core";
import { singleSpaAngular } from "single-spa-angular";

import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

const domElementGetter = () => {
  let el = document.getElementById("angular-app");
  if (!el) {
    el = document.createElement("div");
    el.id = "angular-app";
    document.body.appendChild(el);
  }

  return el;
};

const lifeCycles = singleSpaAngular({
  bootstrapFunction: async () => {
    try {
      return bootstrapApplication(AppComponent, appConfig);
    } catch (error) {
      console.error("Bootstrapp Error!!", error);
    }
  },
  domElementGetter,
  NgZone,
  template: `<app-root />`,
});

export const bootstrap = (props) => lifeCycles.bootstrap(props);
export const mount = (props) => lifeCycles.mount(props);
export const unmount = (props) => lifeCycles.unmount(props);
