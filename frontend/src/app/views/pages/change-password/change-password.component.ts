import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../store/auth/selectors';
import { User } from '../../../models/user/user.model';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });

  public currentUser: User | null = null;
  changePasswordFailed: boolean = false;

  constructor(
    private router: Router,
    private readonly store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectCurrentUser)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  changePassword() {
    const payload = {
      email: this.currentUser?.emailAddress,
      oldPassword: this.changePasswordForm.get('oldPassword')?.value,
      newPassword: this.changePasswordForm.get('newPassword')?.value,
    };
  }
}
