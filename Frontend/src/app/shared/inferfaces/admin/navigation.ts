import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  // {
  //   id: 'page',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'Authentication',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'ti ti-key',
  //       children: [
  //         {
  //           id: 'login',
  //           title: 'Login',
  //           type: 'item',
  //           url: '/guest/login',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    id: 'elements',
    title: 'Manage',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'products',
        title: 'Products',
        type: 'item',
        classes: 'nav-item',
        url: '/products',
        icon: 'ti ti-typography'
      },
      {
        id: 'Orders',
        title: 'Orders',
        type: 'item',
        classes: 'nav-item',
        url: '/orders',
        icon: 'ti ti-brush'
      }
    ]
  },
];

@Injectable({
  providedIn: 'root'
})
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}