import { Component, Input } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

import { select, Store } from '@ngrx/store';
import {
  selectIsLoggedIn,
  selectCurrentUser,
} from '../../../store/auth/selectors';
import { logout } from '../../../store/auth/actions';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/store/auth/state';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  public isLoggedIn: boolean = false;
  public currentUser: CurrentUser | null = null;

  constructor(
    private classToggler: ClassToggleService,
    private readonly store: Store,
    private router: Router
  ) {
    super();
    this.store.pipe(select(selectIsLoggedIn)).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.store.pipe(select(selectCurrentUser)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
