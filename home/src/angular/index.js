import "zone.js";
import "reflect-metadata";
import singleSpaAngular from "single-spa-angular2";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Router } from "@angular/router";

import mainModule from "./main-module";

const domElementGetter = () => {
  const id = "angular-app-local";
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement(id);
    el.id = "angular";
    document.body.appendChild(el);
  }

  return el;
};

const ngLifecycles = singleSpaAngular({
  domElementGetter,
  mainModule,
  angularPlatform: platformBrowserDynamic(),
  template: `<AngularApp />`,
  Router,
});

export const bootstrap = (props) => ngLifecycles.bootstrap(props);
export const mount = (props) => ngLifecycles.mount(props);
export const unmount = (props) => ngLifecycles.unmount(props);
