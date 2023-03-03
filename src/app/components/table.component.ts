import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, Input, TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  template: `
    <p-table [columns]="cols" [value]="rows">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{col.header}}
                </th>
                <th *ngIf="actionTemplate" class="w-36">
                    Actions
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr>
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
                <td *ngIf="actionTemplate">
                    <ng-container *ngTemplateOutlet="actionTemplate; context: { $implicit: rowData  }"></ng-container>
                </td>
            </tr>
        </ng-template>
    </p-table>
  `,
  imports: [
    TableModule,
    NgTemplateOutlet,
    NgFor,
    NgIf
  ],
  styles: [],
})
export default class TableComponent {
    @Input() cols: {field: string, header: string}[] = [];
    @Input() rows?: any = [];
    @Input() actionTemplate?: TemplateRef<any>;
}