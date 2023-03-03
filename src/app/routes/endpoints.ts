import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import DashboardComponent from '../layouts/dashboard.component';

@Component({
  selector: 'app-endpoints',
  standalone: true,
  template: `
    <layout-dashboard title="Endpoints">
      <p class="text-orange-500">Working Analog! LD</p>
    </layout-dashboard>
  `,
  imports: [
    DashboardComponent,
  ],
  styles: [],
})
export default class EndpointsComponent {}
