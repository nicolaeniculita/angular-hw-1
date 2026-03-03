import { Component } from '@angular/core';

type NavItem = {
  label: string;
  route: string;
  iconSrc: string;
  iconClass?: string;
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent {
  public readonly navItems: NavItem[] = [
    { label: 'Table', route: '/table', iconClass: 'table', iconSrc: 'assets/icons/table.png' },
    { label: 'Statistics', route: '/statistics', iconClass: 'stats', iconSrc: 'assets/icons/stats.png' },
  ];
}
