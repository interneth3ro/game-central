import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import * as actions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Game Central!';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private readonly store: Store
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    if (localStorage.getItem('profile')) {
      this.store.dispatch(actions.loginUser({ payload: JSON.parse(localStorage.getItem('profile') || '') }));
    }
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
