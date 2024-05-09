import "./app.css";
import React from "react";
import { UserForm } from "./UserForm";

export function App() {
  return (
    <UserForm
      email="m@m.com"
      name="M"
      onClick={(user) => {
        console.log(user);
      }}
    />
  );
}
