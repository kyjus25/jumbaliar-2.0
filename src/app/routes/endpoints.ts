import { Component, inject } from '@angular/core';
import DashboardComponent from '../layouts/dashboard.component';
import TableComponent from '../components/table.component';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-endpoints',
  standalone: true,
  template: `
    <layout-dashboard>
      <div class="flex">
        <div class="w-96 border-r border-primary mr-6 pr-6">
          <div class="flex items-center justify-between mb-3">
            <h1 class="text-2xl">Models</h1>
            <p-button icon="pi pi-plus" styleClass="p-button-sm" />
          </div>
          <p-tree [value]="models$ | async"></p-tree>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-3">
            <h1 class="text-2xl">Endpoints</h1>
            <p-button icon="pi pi-plus" styleClass="p-button-sm" />
          </div>  
          <app-table [cols]="cols" [rows]="endpoints$ | async" [actionTemplate]="actions">
            <ng-template #actions let-rowData>
              Test wtd
            </ng-template>
          </app-table>
        </div>
      </div>
    </layout-dashboard>
  `,
  imports: [
    DashboardComponent,
    AsyncPipe,
    TableComponent,
    ButtonModule,
    TreeModule,
    HttpClientModule
  ],
  styles: [],
})
export default class EndpointsComponent {
  private http: HttpClient = inject(HttpClient);
  
  public cols = [ 
    { field: 'id', header: 'Woo!' }
  ]
  public models$: Observable<TreeNode[]> = this.http.get<any[]>('/api/models').pipe(
    map(i => i.map(j => ({label: j.name, icon: 'pi pi-lock'})))
  );

  public endpoints$: Observable<any[]> = this.http.get<any[]>('/api/endpoints').pipe(
    
  );
}
