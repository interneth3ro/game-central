import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
  },
  {
    title: true,
    name: 'Games',
  },
  {
    name: 'Bingo',
    url: '/bingo',
    iconComponent: { name: 'cil-grid' },
  },
];
