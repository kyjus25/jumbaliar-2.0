import { Component, inject } from '@angular/core';
import DashboardComponent from '../layouts/dashboard.component';
import TableComponent from '../components/table.component';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, combineLatest, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { Model } from '../types/model.type';
import { Endpoint } from '../types/endpoint.type';
import { Application } from '../types/application.type';

@Component({
  selector: 'app-endpoints',
  standalone: true,
  template: `
    <layout-dashboard>
      <div class="flex">
        <div class="w-80 border-r border-primary mr-6 pr-6">
          <div class="flex items-center justify-between mb-3">
            <h1 class="text-2xl">Models</h1>
            <p-button icon="pi pi-plus" styleClass="p-button-sm" />
          </div>
          <p-tree *ngIf="(models$ | async) as value" [value]="value" selectionMode="single" (onNodeSelect)="nodeSelect($event)"></p-tree>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-3">
            <h1 class="text-2xl">Endpoints</h1>
            <div *ngIf="activeModel$ | async">
              <p-button icon="pi pi-plus" styleClass="p-button-sm !mr-3" />
              <p-button icon="pi pi-star" styleClass="p-button-sm p-button-secondary" />
            </div>
          </div>  
          <app-table *ngIf="activeModel$ | async" [cols]="cols" [rows]="endpoints$ | async" [actionTemplate]="actions">
            <ng-template #actions let-rowData>
              Test wtd
            </ng-template>
          </app-table>
          <p *ngIf="!(activeModel$ | async)">Select a model to view it's endpoints.</p>
        </div>
      </div>
    </layout-dashboard>
  `,
  imports: [
    DashboardComponent,
    NgIf,
    AsyncPipe,
    TableComponent,
    ButtonModule,
    TreeModule,
    HttpClientModule
  ],
  styles: [],
})
export default class EndpointsComponent {

  public activeModel$: BehaviorSubject<TreeNode<Model> | null> = new BehaviorSubject<TreeNode<Model> | null>(null);

  private http: HttpClient = inject(HttpClient);
  
  public cols = [ 
    { field: 'id', header: 'ID' },
    { field: 'path', header: 'Path' },
    { field: 'method', header: 'Method' },
    { field: 'application', header: 'Application' },
  ];

  public models$: Observable<TreeNode[]> = this.http.get<Model[]>('/api/models').pipe(
    map(i => i.map(j => ({label: j.name, data: j, icon: 'pi pi-lock'})))
  );

  public endpoints$: Observable<any[]> = combineLatest([
    this.activeModel$,
    this.http.get<Endpoint[]>('/api/endpoints'),
    this.http.get<Application[]>('/api/applications'),
  ]).pipe(
    switchMap(([activeModel, endpoints]) => activeModel ? of(endpoints.filter(i => i.modelId === activeModel.id)) : of([]))
  );

  public nodeSelect(event: {node: TreeNode} & Event) {
    console.log(event.node.data);
    this.activeModel$.next(event.node.data);
  }
}
