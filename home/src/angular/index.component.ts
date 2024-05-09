import { Component, ChangeDetectorRef, Inject } from "@angular/core";
import e from "../event-bus";

@Component({
  selector: "AngularApp",
  template: `
    <div>
      <p>{{ message }}</p>
    </div>
  `,
})
export default class AngularApp {
  message: string = "Message from React should appear here 😱";

  constructor(
    @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterContentInit() {
    e.on("message", (message) => {
      this.message = message.text;
      this.changeDetector.detectChanges();
      this.returnMessageToReactWhenReceived();
    });
  }

  returnMessageToReactWhenReceived() {
    e.emit("received", { text: "Woohoo! Hello from Angular! 🎉" });
  }
}
