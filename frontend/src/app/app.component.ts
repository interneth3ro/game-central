import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { UserService } from './services/user/user.service';
import { GetUserResult } from './models/user/user.model';
import { loginUser } from './store/auth/actions';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Game Central!';
  fbAuth: Auth = getAuth();

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private readonly store: Store,
    private userService: UserService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    onAuthStateChanged(this.fbAuth, (user) => {
      if (user) {
        this.userService
          .getUserById(user.uid)
          .then((userResult: GetUserResult) => {
            this.store.dispatch(loginUser({ payload: userResult.user }));
          });
      }
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
