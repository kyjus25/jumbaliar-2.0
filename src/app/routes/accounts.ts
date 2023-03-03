import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import TableComponent from '../components/table.component';
import DashboardComponent from '../layouts/dashboard.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  template: `
    <layout-dashboard>
      <div class="flex items-center justify-between mb-3">
        <h1 class="text-2xl">Accounts</h1>
        <p-button icon="pi pi-plus" styleClass="p-button-sm" />
      </div>
      <app-table [cols]="cols" [rows]="rows$ | async" [actionTemplate]="actions">
        <ng-template #actions let-rowData>
          <!-- <p-button icon="pi pi-plus" styleClass="p-button-sm !mr-3" /> -->
          <p-button icon="pi pi-pencil" styleClass="p-button-sm p-button-secondary !mr-3" />
          <!-- <p-button icon="pi pi-search" styleClass="p-button-sm p-button-secondary !mr-3" />
          <p-button icon="pi pi-star" styleClass="p-button-sm p-button-secondary !mr-3" /> -->
          <p-button icon="pi pi-trash" styleClass="p-button-sm p-button-danger" />
        </ng-template>
      </app-table>
    </layout-dashboard>
  `,
  imports: [
    DashboardComponent,
    TableComponent,
    AsyncPipe,
    HttpClientModule,
    ButtonModule
  ],
  styles: [],
})
export default class AccountsComponent {
  private http: HttpClient = inject(HttpClient);

  public cols = [ 
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'username', header: 'Username' }
  ];

  public rows$ = this.http.get<any[]>('/api/users');
}