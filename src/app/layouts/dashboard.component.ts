import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'layout-dashboard',
  standalone: true,
  template: `
    <header class="flex items-center justify-between bg-primary text-center p-3">
        <div class="flex-1"></div>
        <h1 class="flex-1 text-3xl">JumbaLiar</h1>
        <div class="flex-1 text-right">
            <p-button (onClick)="menu.toggle($event)" styleClass="p-button-sm !py-1 !px-2">
                <p-avatar icon="pi pi-user"></p-avatar>
                <p class="text-left font-bold">
                    Justin White<br>
                    <small class="block font-light -mt-1">juwhite</small>
                </p>
            </p-button>
            <p-menu #menu [popup]="true" [model]="accountItems"></p-menu>
        </div>
    </header>
    <p-menubar [model]="navItems"></p-menubar>
    <div class="container p-3 mx-auto max-w-5xl">
        <ng-content></ng-content>
    </div>
  `,
  imports: [
    AvatarModule,
    ButtonModule,
    MenuModule,
    MenubarModule,
  ],
  styles: [],
})
export default class DashboardComponent {
    @Input() title: string = '';

    public accountItems: MenuItem[] = [
        {
            icon: 'pi pi-sign-out',
            label: 'Log Out',
            routerLink: '/login'
        }
    ];

    public navItems: MenuItem[] = [
        {
            icon: 'pi pi-sign-out',
            label: 'Endpoints',
            routerLink: '/endpoints'
        },
        {
            icon: 'pi pi-image',
            label: 'Media',
            routerLink: '/media'
        },
        {
            icon: 'pi pi-users',
            label: 'Accounts',
            routerLink: '/accounts'
        },
        {
            icon: 'pi pi-folder',
            label: 'Applications',
            routerLink: '/applications'
        },
        {
            icon: 'pi pi-globe',
            label: 'Swagger UI',
            command: () => window.open("/swagger-ui")
        }
    ];
}