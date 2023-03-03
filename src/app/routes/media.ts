import { Component } from '@angular/core';
import DashboardComponent from '../layouts/dashboard.component';

@Component({
  selector: 'app-media',
  standalone: true,
  template: `
    <layout-dashboard>
      <h1 class="text-2xl mb-3">Media</h1>
      <p class="text-orange-500">Working Analog!</p>
    </layout-dashboard>
  `,
  imports: [
    DashboardComponent,
  ],
  styles: [],
})
export default class MediaComponent {}