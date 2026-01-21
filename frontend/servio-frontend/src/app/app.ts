import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// root UI component definition
@Component({
  selector: 'app-root', // this component will be rendered when app-root appears in html
  imports: [RouterOutlet], // the component is allowed to use router-outlet in its html
  templateUrl: './app.html', // defines the location of the html for this component
  styleUrl: './app.css' // defines the location of css
})

// logic container
export class App {
  protected readonly title = signal('servio-frontend'); // signal = variable watched by Angular in case of changes
}
