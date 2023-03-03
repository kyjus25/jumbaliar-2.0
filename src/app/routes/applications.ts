import { Component } from '@angular/core';
import DashboardComponent from '../layouts/dashboard.component';

@Component({
  selector: 'app-applications',
  standalone: true,
  template: `
    <layout-dashboard title="Applications">
      <p class="text-orange-500">Working Analog!</p>
    </layout-dashboard>
  `,
  imports: [
    DashboardComponent,
  ],
  styles: [],
})
export default class ApplicationsComponent {}