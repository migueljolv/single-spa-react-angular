import React from "react";
import { ProfileReactComponent } from "./ProfileReactComponent";

export function App() {
  return (
    <ProfileReactComponent
      email="m@m.com"
      name="M"
      onClick={(user) => {
        console.log(user);
      }}
    />
  );
}
